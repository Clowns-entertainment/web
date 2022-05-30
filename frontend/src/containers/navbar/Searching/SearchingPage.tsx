import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CommentView from '../../content/mainpage/CommentView/CommentView';

function useQuery() {
  // Use the URLSearchParams API to extract the query parameters
  // useLocation().search will have the query parameters eg: ?foo=bar&a=b
  return new URLSearchParams(useLocation().search);
}

export default function SearchingPage() {
  const query = useQuery();
  const request = query.get('request');
  const [comments, setComments] = useState([]);
  const data = new FormData();
  // @ts-ignore
  data.append('search_str', request);
  const getComments = async (url: string) => {
    const response = await fetch(url, {
      method: 'POST',
      body: data,
    });
    return await response.json();
  };

  useEffect(() => {
    getComments('/api/search').then((data) => setComments(data));
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <CommentView comments={comments} />
    </>
  );
}
