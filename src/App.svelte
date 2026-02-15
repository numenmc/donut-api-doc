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
  } from "@sveltestrap/sveltestrap";

  import {
    ExclamationCircleFill,
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
  import Endpoint from "./components/Endpoint.svelte";
</script>

<main class="app">
  <Container class="pt-5 pb-5">
    <Row class="g-4">
      <Col md="4" lg="3">
        <div class="sticky">
          <Card class="mb-4">
            <CardHeader>
              <CardTitle class="mb-0">Contents</CardTitle>
            </CardHeader>

            <CardBody>TODO</CardBody>

            <CardFooter>
              <a href="https://github.com/numenmc/donut-api-doc">
                Contribute on GitHub
              </a>
            </CardFooter>
          </Card>
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

        <Alert color="primary">
          <QuestionCircleFill class="icon r"></QuestionCircleFill>
          This API's base url is <code>{specification.baseUrl}</code>. To use
          the endpoints you must retrieve an API key using <code>/api</code>
          in-game and supplying it to the <code>Authorization</code> header in
          the format <code>Bearer (token)</code>.
        </Alert>
        <Alert color="warning">
          <ExclamationCircleFill class="icon r"></ExclamationCircleFill>
          Much of this documentation diverges from REST/OpenAPI conventions. These
          behaviours originate from the upstream API and are documented as-is.
        </Alert>

        <div style="margin-bottom: 75px;"></div>
        <!-- Spacer -->

        {#each specification.endpoints as endpoint}
          <Endpoint {endpoint}></Endpoint>
        {/each}
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
