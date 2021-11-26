import React, { useContext, Fragment } from 'react';
import { Item, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import MarcaListItem from './MarcaListItem';
import { RootStoreContext } from '../../../app/stores/rootStore';
import {format} from 'date-fns';

const MarcaList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { marcasByDate } = rootStore.marcaStore;
  return (
    <Fragment>
      {marcasByDate.map(([group, marcas]) => (
        <Fragment key={group}>
          <Item.Group divided>
            {marcas.map(marca => (
              <MarcaListItem key={marca.id} marca={marca} />
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(MarcaList);
