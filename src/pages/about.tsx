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
            全く別の業界から転職し、30歳でwebエンジニアになりました。
          </p>
          <p>
            ブログには、主にReact/React Nativeの話を書いていくつもりです。
          </p>
          <p>
            このブログも、Gatsby.js + React + Netlify で書いています。
          </p>
        </Container>
      </Segment>
    </Container>
  );
};

export default withLayout(AboutPage);
