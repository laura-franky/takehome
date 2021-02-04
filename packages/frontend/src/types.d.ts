import 'styled-components';
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      backgroundColor: string;
      fontColor: string;
      primaryColor: string;
      secondaryColor: string;
      shadowColor: string;
      listBackgroundColor: string;
      primary: string;
      danger: string;
      warning: string;
      success: string;
    };
  }
}
