

export function addPost(newPost) {
    console.log(newPost);
    return async (dispatch) => {
      try {
        const addedPost = await eventService.addPost(newPost);
        console.log(addedEvent);
        dispatch({ type: 'ADD_POST', addedPost });
        // getEventById(addedEvent._id);
        // return addedEvent;
      } catch (err) {
        console.log('PostActions: err in addPost', err);
      }
    };
  }