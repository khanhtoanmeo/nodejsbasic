(async () => {
  const usersRequest = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );
  const postsRequest = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const commentsRequest = await fetch(
    "https://jsonplaceholder.typicode.com/comments"
  );
  const users = await usersRequest.json();
  const posts = await postsRequest.json();
  const comments = await commentsRequest.json();

  ///// 3
  const usersFullInfomation = users.map((u) => {
    const { id, name, username, email } = u;
    const userToReturn = {
      id,
      name,
      username,
      email,
      posts: posts.filter((p) => p.userId === u.id),
    };
    userToReturn.comments = userToReturn.posts.reduce(
      (acc, cur) => acc.concat(comments.filter((c) => c.postId === cur.id)),
      []
    );
    return userToReturn;
  });

  ///// 4
  const usersWithMoreThan3Comments = usersFullInfomation.filter(
    (u) => u.comments.length > 3
  );

  ///// 5
  const usersReformatted = usersFullInfomation.map((u) => {
    return {
      ...u,
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
    (a, b) => b.postsCount - a.postsCount
  );

  ///// 8
  const post1Request = await fetch(
    "https://jsonplaceholder.typicode.com/posts/1"
  );
  const commentsOfPost1Request = await fetch(
    "https://jsonplaceholder.typicode.com/posts/1/comments"
  );
  const post1 = await post1Request.json();
  const commentsOfPost1 = await commentsOfPost1Request.json();
  post1.comments = commentsOfPost1;

  // console.dir(usersSortedByPostsCount, { depth: 3 });
  // console.log(userWithMostPosts);
  // console.log(post1);
})();
