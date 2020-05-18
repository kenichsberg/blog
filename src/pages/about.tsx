import * as React from "react";
import { Header, Container, Segment, Icon } from "semantic-ui-react";
import {withLayout} from "../components/Layout";

const AboutPage = () => {
  return (
    <Container>
      <Segment vertical>
        <Header as="h2">
          <Icon name="info circle" />
          <Header.Content>
            About
          </Header.Content>
        </Header>
      </Segment>
      <Segment vertical>
        <Header as="h4">
          管理人： 
          <Header.Content>
            Ken
          </Header.Content>
        </Header>
        <p>
          全く別の業界から転職し、30歳でwebエンジニアになりました。
        </p>
        <p>
          普段はぺちぱーですが、趣味で React/React Native の開発をしています。
        </p>
        <p>
          ブログには、主にReact/React Nativeの話を書いていくつもりです。
        </p>
        <p>
          このブログも、Gatsby.js + React + Netlify で書いています。
        </p>
      </Segment>
    </Container>
  );
};

export default withLayout(AboutPage);
