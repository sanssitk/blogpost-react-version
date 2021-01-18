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

const readData = () => {
  const rawdata = fs.readFileSync(PATH);
  const obj = JSON.parse(rawdata);
  return obj;
};

const storeData = (rawData) => {
  let data = JSON.stringify(rawData);
  fs.writeFileSync(PATH, data);
};
