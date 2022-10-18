export const getWidth = (w) => {
    return (dispatch) => {
      dispatch({type:"GET_WIDTH",payload:w})
    };
  };