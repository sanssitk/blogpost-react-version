import fs from "fs";
const PATH = "./datas.json";

export const get = () => {
  return readData();
};

export const getIndividualBlog = (postId) => {  
  const posts = readData();
  const foundPost = posts.find((post) => post.id == postId);
  return (foundPost);
};

export const add = (newPost) => {
  const currentPosts = readData();
  currentPosts.unshift(newPost);
  storeData(currentPosts);
};

export const deleteIndividualBlog = (postId) => {
  const posts = readData();
  const deletePost = posts.filter(post => {
    return post.id == postId;
  })[0];
  const index = posts.indexOf(deletePost);
  posts.splice(index, 1);
  // response.json({ message: `User ${contactId} deleted.`});
}

const readData = () => {
  const rawdata = fs.readFileSync(PATH);
  const obj = JSON.parse(rawdata);
  return obj;
};

const storeData = (rawData) => {
  let data = JSON.stringify(rawData);
  fs.writeFileSync(PATH, data);
};
