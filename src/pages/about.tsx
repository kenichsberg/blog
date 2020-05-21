import * as React from "react";
import Helmet from "react-helmet";
import { Header, Container, Segment, Icon } from "semantic-ui-react";
import {withLayout} from "../components/Layout";

const config = require("../../gatsby-config.js");

const AboutPage = () => {
  return (
    <Container>
      <Helmet>
        <title>{`About | ${config.siteMetadata.title}`}</title>
      </Helmet>
      <Segment vertical>
        <Header as="h2">
          <Icon name="info circle" />
          <Header.Content>
            About
          </Header.Content>
        </Header>
      </Segment>
      <Segment vertical>
        <Container text>
          <Header as="h3">
            <Header.Content>
              Ken
            </Header.Content>
          </Header>
          <p>
            30歳の時に全く別の業界から転職し、webエンジニアになりました。
          </p>
          <p>
            仕事ではPHP、趣味でReact/React Nativeを書いています。Typescriptを勉強中。
          </p>
          <br />
          <Header as="h3">
            <Header.Content>
              ブログについて
            </Header.Content>
          </Header>
          <p>
            Gatsby.jsを使ってみたいと思いブログを始めました。
          </p>
          <p>
            このブログは、Gatsby.js + React + Netlify で書いています。
          </p>
          <p>
            ※本ブログに記載するコードは、自由に使用していただいて結構です。
          </p>
        </Container>
      </Segment>
    </Container>
  );
};

export default withLayout(AboutPage);
