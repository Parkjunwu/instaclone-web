import "styled-components"

declare module "styled-components" {
  export interface DefaultTheme {
    accent: string;
    borderColor: string;
    bgColor:string;
    fontColor:string;
    focusBorderWidth?:string;
    focusBorderColor?:string;
  }
}



// import'styled-components';

// // and extend them!
// declare module 'styled-components' {
//   export interface DefaultTheme {
//     bgColor: string;
//     fontColor: string;
//   }
// }