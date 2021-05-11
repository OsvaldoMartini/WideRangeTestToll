import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import MarcaDetailedHeader from './MarcaDetailedHeader';
import MarcaDetailedInfo from './MarcaDetailedInfo';
import MarcaDetailedChat from './MarcaDetailedChat';
import MarcaDetailedSidebar from './MarcaDetailedSidebar';
import { RootStoreContext } from '../../../app/stores/rootStore';

interface DetailParams {
  id: string;
}

const MarcaDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const { marca, loadMarca, loadingInitial } = rootStore.marcaStore;

  useEffect(() => {
    loadMarca(match.params.id);
  }, [loadMarca, match.params.id, history]);

  if (loadingInitial) return <LoadingComponent content='Loading marca...' />;

  if (!marca) return <h2>Marca not found</h2>;

  return (
    <Grid>
      <Grid.Column width={10}>
        <MarcaDetailedHeader marca={marca} />
        <MarcaDetailedInfo marca={marca} />
        <MarcaDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <MarcaDetailedSidebar attendees={marca.attendees} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(MarcaDetails);
