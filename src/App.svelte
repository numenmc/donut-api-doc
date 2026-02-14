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
  } from "@sveltestrap/sveltestrap";

  import "@fontsource/roboto/100";
  import "@fontsource/roboto/200";
  import "@fontsource/roboto/300";
  import "@fontsource/roboto/400";
  import "@fontsource/roboto/500";
  import "@fontsource/roboto/600";
  import "@fontsource/roboto/700";
  import "@fontsource/roboto/800";

  import { i18n } from "./i18n";
</script>

<main class="app">
  <Container class="pt-5">
    <Row class="g-4">
      <Col md="4" lg="3">
        <div class="sticky">
          <Card class="mb-4">
            <CardHeader>
              <CardTitle class="mb-0">{i18n.t("sidebar.contents.title")}</CardTitle>
            </CardHeader>

            <CardBody>
              TODO
            </CardBody>

            <CardFooter>
              <a href="https://github.com/numenmc/donut-api-doc">
                {i18n.t("sidebar.contribute_notice")}
              </a>
            </CardFooter>
          </Card>
        </div>
      </Col>

      <Col md="8" lg="9">
        <h1 class="display-5">{i18n.t("info.title")}</h1>
        <p class="lead">
          {@html i18n.t("info.lead_text", { link: "<a href=\"https://api.donutsmp.net\">https://api.donutsmp.net</a>" })}
        </p>
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
