import { observable, action, computed, runInAction, reaction, toJS } from 'mobx';
import { SyntheticEvent } from 'react';
import { IMarca } from '../models/marca';
import agent from '../api/agent';
import { history } from '../..';
import { toast } from 'react-toastify';
import { RootStore } from './rootStore';
import { setMarcaProps, createAttendee } from '../common/util/util';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';

const LIMIT = 2;

export default class MarcaStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    reaction(
      () => this.predicate.keys(),
      () => {
        this.page = 0;
        this.marcaRegistry.clear();
        this.loadMarcas();
      }
    )
  }

  @observable marcaRegistry = new Map();
  @observable marca: IMarca | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';
  @observable loading = false;
  @observable.ref hubConnection: HubConnection | null = null;
  @observable marcaCount = 0;
  @observable page = 0;
  @observable predicate = new Map();

  @action setPredicate = (predicate: string, value: string | Date) => {
    this.predicate.clear();
    if (predicate !== 'all') {
      this.predicate.set(predicate, value);
    }
  }

  @computed get axiosParams() {
    const params = new URLSearchParams();
    params.append('limit', String(LIMIT));
    params.append('offset', `${this.page ? this.page * LIMIT : 0}`);
    this.predicate.forEach((value, key) => {
      if (key === 'startDate') {
        params.append(key, value.toISOString())
      } else {
        params.append(key, value)
      }
    })
    return params;
  }

  @computed get totalPages() {
    return Math.ceil(this.marcaCount / LIMIT);
  }

  @action setPage = (page: number) => {
    this.page = page;
  }

  @action createHubConnection = () => {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(process.env.REACT_APP_API_CHAT_URL!, {
        accessTokenFactory: () => this.rootStore.commonStore.token!
      })
      .configureLogging(LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log(this.hubConnection!.state))
      .catch(error => console.log('Error establishing connection: ', error));

    this.hubConnection.on('ReceiveComment', comment => {
      runInAction(() => {
        this.marca!.comments.push(comment)
      })
    })
  };

  @action stopHubConnection = () => {
    this.hubConnection!.stop()
  }

  @action addComment = async (values: any) => {
    values.marcaId = this.marca!.id;
    try {
      await this.hubConnection!.invoke('SendComment', values)
    } catch (error) {
      console.log(error);
    }
  } 

  @computed get marcasByDate() {
    return this.groupMarcasByDate(
      Array.from(this.marcaRegistry.values())
    );
  }

  groupMarcasByDate(marcas: IMarca[]) {
    const sortedMarcas = marcas.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
    return Object.entries(
      sortedMarcas.reduce(
        (marcas, marca) => {
          const date = marca.date.toISOString().split('T')[0];
          marcas[date] = marcas[date]
            ? [...marcas[date], marca]
            : [marca];
          return marcas;
        },
        {} as { [key: string]: IMarca[] }
      )
    );
  }

  @action loadMarcas = async () => {
    this.loadingInitial = true;
    try {
      const marcasEnvelope = await agent.Marcas.list(this.axiosParams);
      const {marcas, marcaCount} = marcasEnvelope;
      runInAction('loading marcas', () => {
        marcas.forEach(marca => {
          setMarcaProps(marca, this.rootStore.userStore.user!);
          this.marcaRegistry.set(marca.id, marca);
        });
        this.marcaCount = marcaCount;
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction('load marcas error', () => {
        this.loadingInitial = false;
      });
    }
  };

  @action loadMarca = async (id: string) => {
    let marca = this.getMarca(id);
    if (marca) {
      this.marca = marca;
      return toJS(marca);
    } else {
      this.loadingInitial = true;
      try {
        marca = await agent.Marcas.details(id);
        runInAction('getting marca', () => {
          setMarcaProps(marca, this.rootStore.userStore.user!);
          this.marca = marca;
          this.marcaRegistry.set(marca.id, marca);
          this.loadingInitial = false;
        });
        return marca;
      } catch (error) {
        runInAction('get marca error', () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };

  @action clearMarca = () => {
    this.marca = null;
  };

  getMarca = (id: string) => {
    return this.marcaRegistry.get(id);
  };

  @action createMarca = async (marca: IMarca) => {
    this.submitting = true;
    try {
      await agent.Marcas.create(marca);
      const attendee = createAttendee(this.rootStore.userStore.user!);
      attendee.isHost = true;
      let attendees = [];
      attendees.push(attendee);
      marca.attendees = attendees;
      marca.comments = [];
      marca.isHost = true;
      runInAction('create marca', () => {
        this.marcaRegistry.set(marca.id, marca);
        this.submitting = false;
      });
      history.push(`/marcas/${marca.id}`);
    } catch (error) {
      runInAction('create marca error', () => {
        this.submitting = false;
      });
      toast.error('Problem submitting data');
      console.log(error.response);
    }
  };

  @action editMarca = async (marca: IMarca) => {
    this.submitting = true;
    try {
      await agent.Marcas.update(marca);
      runInAction('editing marca', () => {
        this.marcaRegistry.set(marca.id, marca);
        this.marca = marca;
        this.submitting = false;
      });
      history.push(`/marcas/${marca.id}`);
    } catch (error) {
      runInAction('edit marca error', () => {
        this.submitting = false;
      });
      toast.error('Problem submitting data');
      console.log(error);
    }
  };

  @action deleteMarca = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Marcas.delete(id);
      runInAction('deleting marca', () => {
        this.marcaRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      });
    } catch (error) {
      runInAction('delete marca error', () => {
        this.submitting = false;
        this.target = '';
      });
      console.log(error);
    }
  };

  @action attendMarca = async () => {
    const attendee = createAttendee(this.rootStore.userStore.user!);
    this.loading = true;
    try {
      await agent.Marcas.attend(this.marca!.id);
      runInAction(() => {
        if (this.marca) {
          this.marca.attendees.push(attendee);
          this.marca.isGoing = true;
          this.marcaRegistry.set(this.marca.id, this.marca);
          this.loading = false;
        }
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      toast.error('Problem signing up to marca');
    }
  };

  @action cancelAttendance = async () => {
    this.loading = true;
    try {
      await agent.Marcas.unattend(this.marca!.id);
      runInAction(() => {
        if (this.marca) {
          this.marca.attendees = this.marca.attendees.filter(
            a => a.username !== this.rootStore.userStore.user!.username
          );
          this.marca.isGoing = false;
          this.marcaRegistry.set(this.marca.id, this.marca);
          this.loading = false;
        }
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      toast.error('Problem cancelling attendance');
    }
  };
}
