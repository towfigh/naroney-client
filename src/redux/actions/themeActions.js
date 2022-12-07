import { CHANGE_THEME_TO_DARK, CHANGE_THEME_TO_LIGHT } from "../actionTypes";

export function changeThemeToDark() {
    return {
      type: CHANGE_THEME_TO_DARK,
    };
  }
  
  export function changeThemeToLight() {
    return {
      type: CHANGE_THEME_TO_LIGHT,
    };
  }