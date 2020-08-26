
import Page from '../components/Page';
import App from "next/app";

class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;

        return (
                <Page>
                    <Component {...pageProps} />
                </Page>
        );
    }
}

export default MyApp;