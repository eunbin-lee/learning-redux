import * as postsAPI from '../api/posts';
import {
  createPromiseThunk,
  handleAsyncActions,
  reducerUtils,
} from '../lib/asyncUtils';

// action
const GET_POSTS = 'GET_POSTS'; // 특정 요청이 시작됨
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'; // 요청 성공
const GET_POSTS_ERROR = 'GET_POSTS_ERROR'; // 요청 실패

const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

/*
// thunk 함수
export const getPosts = () => async (dispatch) => {
  // 요청이 시작됨
  dispatch({ type: GET_POSTS });

  // API를 호출
  try {
    const posts = await postsAPI.getPosts();

    // 성공
    dispatch({
      type: GET_POSTS_SUCCESS,
      posts,
    });
  } catch (e) {
    // 실패
    dispatch({
      type: GET_POSTS_ERROR,
      error: e,
    });
  }
};

export const getPost = (id) => async (dispatch) => {
  // 요청이 시작됨
  dispatch({ type: GET_POST });

  // API를 호출
  try {
    const post = await postsAPI.getPostById(id);

    // 성공
    dispatch({
      type: GET_POST_SUCCESS,
      post,
    });
  } catch (e) {
    // 실패
    dispatch({
      type: GET_POST_ERROR,
      error: e,
    });
  }
};
*/
// → 리팩토링 →
export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
export const getPost = createPromiseThunk(GET_POST, postsAPI.getPostById);

// 초기 상태
const initialState = {
  posts: reducerUtils.initial(),
  post: reducerUtils.initial(),
};

/*
// reducer
export default function posts(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: reducerUtils.loading(),
            };
            case GET_POSTS_SUCCESS:
                return {
                    ...state,
        // posts: reducerUtils.success(action.posts),
        posts: reducerUtils.success(action.payload),
    };
    case GET_POSTS_ERROR:
        return {
        ...state,
        // posts: reducerUtils.error(action.error),
        posts: reducerUtils.error(action.payload),
    };
    default:
        return state;
    }
}

export default function post(state = initialState, action) {
    switch (action.type) {
        case GET_POST:
            return {
                ...state,
        post: reducerUtils.loading(),
    };
    case GET_POST_SUCCESS:
        return {
        ...state,
        // post: reducerUtils.success(action.post),
        post: reducerUtils.success(action.payload),
      };
      case GET_POST_ERROR:
          return {
        ...state,
        // post: reducerUtils.error(action.error),
        post: reducerUtils.error(action.payload),
    };
    default:
      return state;
    }
}
*/
// → 리팩토링 →
const getPostsReducer = handleAsyncActions(GET_POSTS, 'posts');
const getPostReducer = handleAsyncActions(GET_POST, 'post');

export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return getPostsReducer(state, action);
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return getPostReducer(state, action);
    default:
      return state;
  }
}