<script lang="ts">
  import {
    CardHeader,
    Card,
    CardTitle,
    CardBody,
    Col,
    Container,
    Row,
    CardFooter,
    Alert,
    Badge,
    ListGroup,
    ListGroupItem,
    Button,
  } from "@sveltestrap/sveltestrap";

  import {
    ExclamationCircleFill,
    Github,
    QuestionCircleFill,
  } from "svelte-bootstrap-icons";

  import "@fontsource/roboto/100";
  import "@fontsource/roboto/200";
  import "@fontsource/roboto/300";
  import "@fontsource/roboto/400";
  import "@fontsource/roboto/500";
  import "@fontsource/roboto/600";
  import "@fontsource/roboto/700";
  import "@fontsource/roboto/800";

  import "@fontsource/jetbrains-mono/100";
  import "@fontsource/jetbrains-mono/500";

  import { specification } from "./specification/specification";
  import EndpointRenderer from "./components/EndpointRenderer.svelte";
  import { URLParameter, type Endpoint } from "./type/specificationType";
  import { getMethodColor } from "./util";

  function getEndpointId(endpoint: Endpoint) {
    return `${endpoint.method}_${endpoint.endpoint.map((a) => (a instanceof URLParameter ? a.name : a)).join("_")}`;
  }
</script>

<main class="app">
  <Container fluid class="pt-5 pb-5" style="max-width: 1500px;">
    <Row class="g-4">
      <Col md="4" lg="3">
        <div class="sticky">
          <ListGroup class="mb-4">
            {#each specification.endpoints as endpoint}
              <ListGroupItem
                tag="a"
                href={`#${getEndpointId(endpoint)}`}
                action
              >
                <div class="contents-list-item">
                  <div class="contents-list-b">
                    <Badge color={getMethodColor(endpoint)} style="width: 100%;"
                      >{endpoint.method}</Badge
                    >
                  </div>
                  <div class="contents-list-t">
                    {`/${endpoint.endpoint.map((a) => (a instanceof URLParameter ? `{${a.name}}` : a)).join("/")}`}
                  </div>
                </div>
              </ListGroupItem>
            {/each}
          </ListGroup>

          <div class="mb-4">
            <a class="btn btn-primary btn-sm" href="https://github.com/numenmc/donut-api-doc">
              <Github class="icon mr-1"></Github>
              Source Code
            </a>
            <a class="btn btn-secondary btn-sm" href="https://github.com/numenmc/donut-api-doc/issues">
              <Github class="icon mr-1"></Github>
              Issues
            </a>
          </div>

          <p
            style="font-size: 8pt; letter-spacing: 5%; margin-left: 0.3em; margin-right: 0.3em;"
          >
            <a href="/.vite/license.md">Third Party Notices</a>
          </p>

          <p
            style="font-size: 8pt; letter-spacing: 5%; margin-left: 0.3em; margin-right: 0.3em;"
          >
            This website is not affiliated with, endorsed by, or sponsored by
            DonutSMP or Minecraft.
          </p>
        </div>
      </Col>

      <Col md="8" lg="9">
        <h1 class="display-5">DonutSMP API Documentation</h1>
        <p class="lead">
          Below is the community maintained version of the API documentation
          form the DonutSMP Data API. If you're looking for the original
          documentation, it can be viewed at <a href="https://api.donutsmp.net"
            >https://api.donutsmp.net</a
          >.
        </p>

        <Alert color="info">
          <QuestionCircleFill class="icon r"></QuestionCircleFill>
          This API's base url is <code>{specification.baseUrl}</code>.
        </Alert>
        <Alert color="info">
          <QuestionCircleFill class="icon r"></QuestionCircleFill>
          Looking for Shield endpoints? They aren't documented here because they are for internal use only.
        </Alert>
        <Alert color="warning">
          <ExclamationCircleFill class="icon r"></ExclamationCircleFill>
          Much of this documentation diverges from REST/OpenAPI conventions. These
          behaviours originate from the upstream API and are documented as-is.
        </Alert>

        <p class="lead">
          To use the endpoints you must retrieve an API key using <code
            >/api</code
          >
          in-game and supply it to the <code>Authorization</code> header as a bearer
          token.
        </p>

        <div style="margin-bottom: 75px;"></div>
        <!-- Spacer -->

        <div style="display: flex; flex-direction: column; gap: 75px;">
          {#each specification.endpoints as endpoint}
            <div id={getEndpointId(endpoint)}>
              <EndpointRenderer {endpoint}></EndpointRenderer>
            </div>
          {/each}
        </div>
      </Col>
    </Row>
  </Container>
</main>

<style>
  .sticky {
    position: sticky;
    top: 1rem;
  }
</style>
