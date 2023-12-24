import Document, { Html, Head, Main, NextScript } from "next/document";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";

export default class MyDocument extends Document {
  //To Fix SSR Issue
  // static async getInitialProps(ctx: any) {
  //   const cache = createCache();
  //   const originalRenderPage = ctx.renderPage;

  //   ctx.renderPage = () =>
  //     originalRenderPage({
  //       enhanceApp: (App: any) => (props: any) =>
  //         (
  //           <StyleProvider cache={cache}>
  //             <App {...props} />
  //           </StyleProvider>
  //         ),
  //     });

  //   const initialProps = await Document.getInitialProps(ctx);
  //   /**
  //    * solve FOUC when SSR
  //    * @reference https://github.com/ant-design/ant-design/issues/40587#issuecomment-1420289185
  //    */
  //   return {
  //     ...initialProps,
  //     styles: (
  //       <>
  //         {initialProps.styles}
  //         <style
  //           data-test="extract"
  //           dangerouslySetInnerHTML={{ __html: extractStyle(cache) }}
  //         />
  //       </>
  //     ),
  //   };
  // }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
