import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { Avatar, Header, Name, Description, Post, Loading } from './styles';

import LazyImage from './components/lazyImage';

const Feed = () => {
  const [feed, setFeed] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);
  const [loadingRefresh, setLoadingRefresh] = useState(false);

  const loadFeed = async (pageNumber = page, shouldRefresh = false) => {
    if (total && pageNumber > total) {
      return;
    }

    setLoading(true);

    const response = await fetch(
      `http://localhost:3000/feed?_expand=author&_limit=5&_page=${pageNumber}`,
    );

    const data = await response.json();
    const totalItens = response.headers.get('X-Total-Count');

    setTotal(Math.floor(totalItens / 5));
    setFeed(shouldRefresh ? data : [...feed, ...data]);
    setPage((num) => num + 1);

    setLoading(false);
  };

  useEffect(() => {
    loadFeed();
  }, []);

  const refreshList = async () => {
    setLoadingRefresh(true);
    await loadFeed(1, true);
    setLoadingRefresh(false);
  };

  return (
    <FlatList
      data={feed}
      keyExtractor={(post) => String(post.id)}
      onEndReachedThreshold={0.3}
      onRefresh={refreshList}
      refreshing={loadingRefresh}
      onEndReached={() => loadFeed()}
      ListFooterComponentStyle={loading && <Loading />}
      renderItem={({ item }) => {
        const { author, image, small, description, aspectRatio } = item;
        const { avatar, name } = author;

        return (
          <Post>
            <Header>
              <Avatar source={{ uri: avatar }} />
              <Name>{name}</Name>
            </Header>

            <LazyImage
              aspectRatio={aspectRatio}
              smallSource={{ uri: small }}
              source={{ uri: image }}
            />

            <Description>
              <Name>{name}</Name> {description}
            </Description>
          </Post>
        );
      }}
    />
  );
};

export default Feed;
