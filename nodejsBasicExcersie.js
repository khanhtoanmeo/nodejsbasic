const fetchData = async (url) => {
  const request = await fetch(url);
  return request.json();
};

const getPost = async (id) => {
  const post = await fetchData(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const commentsOfThePost = await fetchData(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`
  );

  return { ...post, comment: commentsOfThePost };
};

(async () => {
  const [users, posts, comments] = await Promise.all([
    fetchData("https://jsonplaceholder.typicode.com/users"),
    fetchData("https://jsonplaceholder.typicode.com/posts"),
    fetchData("https://jsonplaceholder.typicode.com/comments"),
  ]);

  ///// 3
  const usersFullInfomation = users.map((user) => {
    const { id, name, username, email } = user;
    const userToReturn = {
      id,
      name,
      username,
      email,
      posts: posts.filter((post) => post.userId === user.id),
    };
    userToReturn.comments = userToReturn.posts.reduce(
      (acc, cur) =>
        acc.concat(comments.filter((comment) => comment.postId === cur.id)),
      []
    );
    return userToReturn;
  });

  ///// 4
  const usersWithMoreThan3Comments = usersFullInfomation.filter(
    (user) => user.comments.length > 3
  );

  ///// 5
  const usersReformatted = usersFullInfomation.map((user) => {
    const { posts, comments } = user;
    return {
      ...user,
      commentsCount: comments.length,
      postsCount: posts.length,
    };
  });

  ///// 6
  const userWithMostComments = usersReformatted.reduce((pre, cur) =>
    pre.commentsCount >= cur.commentsCount ? pre : cur
  );

  const userWithMostPosts = usersReformatted.reduce((pre, cur) =>
    pre.postsCount >= cur.postsCount ? pre : cur
  );

  ///// 7
  const usersSortedByPostsCount = usersReformatted.sort(
    (userA, userB) => userB.postsCount - userA.postsCount
  );

  ///// 8
  const firstPost = await getPost(1);

  // console.dir(usersSortedByPostsCount, { depth: 3 });
  // console.log(userWithMostComments);
  console.log(firstPost);
  console.log(usersReformatted);
})();
