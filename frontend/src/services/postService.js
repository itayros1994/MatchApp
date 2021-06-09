import { httpService } from './httpService'
// import { storageService } from './asyncStorageService'
// import userService from './userService'
// import { utilService } from './utilService'

export const postService = {
  add,
  remove
  // query,
}


// More ways to send query params:
// return axios.get('api/toy/?id=1223&balance=13')
// return axios.get('api/toy/?', {params: {id: 1223, balanse:13}})

// function query(filterBy) {
//   var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
//   return httpService.get(`review${queryStr}`)
//   // return storageService.query('review')
// }

function remove(postId) {
  // return httpService.delete(`review/${reviewId}`)s
  return storageService.delete('post', postId)

}

function addPost(newPost) {
  storageService.post(STORAGE_KEY, newPost);
  return Promise.resolve(newPost);
}
