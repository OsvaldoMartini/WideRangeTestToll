import React, { useContext, useEffect, useState } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import MarcaList from './MarcaList';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import InfiniteScroll from 'react-infinite-scroller';
import MarcaFilters from './MarcaFilters';
import MarcaListItemPlaceholder from './MarcaListItemPlaceholder';

const MarcaDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadMarcas,
    loadingInitial,
    setPage,
    page,
    totalPages
  } = rootStore.marcaStore;
  const [loadingNext, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    setPage(page + 1);
    loadMarcas().then(() => setLoadingNext(false));
  };

  useEffect(() => {
    loadMarcas();
  }, [loadMarcas]);

  return (
    <Grid>
      <Grid.Column width={10}>
        {loadingInitial && page === 0 ? (
          <MarcaListItemPlaceholder />
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={!loadingNext && page + 1 < totalPages}
            initialLoad={false}
          >
            <MarcaList />
          </InfiniteScroll>
        )}
      </Grid.Column>
      <Grid.Column width={6}>
        <MarcaFilters />
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(MarcaDashboard);
