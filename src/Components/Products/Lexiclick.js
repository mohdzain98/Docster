import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Styling/products.css";
import { useMediaQuery } from "react-responsive";

const Lexiclick = () => {
  const [active, setActive] = useState("about");
  const [about, setAbout] = useState(true);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const aboutt = () => {
    setAbout(true);
    setActive("about");
  };
  const policy = () => {
    setAbout(false);
    setActive("policy");
  };
  return (
    <div
      className="container p-4"
      style={isTabletOrMobile ? { marginTop: "-10%" } : { marginTop: "-2%" }}
      id="surfmind"
    >
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li class="breadcrumb-item">
            <Link to="/product">Product</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Lexiclick
          </li>
        </ol>
      </nav>

      <div>
        <nav class="nav nav-pills justify-content-center">
          <li class="nav-item">
            <Link class="nav-link text-dark" onClick={aboutt}>
              About
            </Link>
            {active === "about" ? (
              <hr className="text-dark" style={{ marginTop: "-1%" }} />
            ) : (
              ""
            )}
          </li>
          <li class="nav-item">
            <Link class="nav-link text-dark" onClick={policy}>
              Privacy Policy
            </Link>
            {active === "policy" ? (
              <hr className="text-dark" style={{ marginTop: "-1%" }} />
            ) : (
              ""
            )}
          </li>
        </nav>
      </div>

      {about ? (
        <div>
          <h1>LexiClick</h1>
          <hr />
          <h4 className="mt-4 text-primary">
            LexiClick - Your AI-Powered Vocabulary Companion
          </h4>
          <hr className="text-primary" />
          <p>
            Elevate your reading experience with LexiClick, the intelligent
            Chrome extension that brings instant access to word definitions,
            examples, synonyms, and antonyms with just a double-click. Whether
            you're browsing news articles, reading a blog, or studying complex
            text, LexiClick helps you effortlessly expand your vocabulary and
            deepen your understanding. Designed with AI-driven features,
            LexiClick takes word exploration to a new level of convenience and
            depth.
          </p>
          <h5 className="mt-4 text-success">Key Features</h5>
          <hr className="text-success" />
          <ul>
            <li>
              <strong>Instant Definitions</strong> : Double-click on any word to
              reveal its meaning instantly, making it easier than ever to grasp
              new vocabulary as you read.
            </li>
            <li>
              <strong>Real-World Examples</strong> : See how words are used in
              context with examples pulled directly from reputable sources,
              helping you understand nuance and proper usage.
            </li>
            <li>
              <strong>Comprehensive Synonyms & Antonyms</strong> : Expand your
              vocabulary with a rich set of synonyms and antonyms, ideal for
              enhancing your writing or simply finding the right word.
            </li>
            <li>
              <strong>AI-Driven Deep Search</strong> : Dive deeper into word
              meanings and related concepts with LexiClick’s AI-powered search,
              accessible right within the extension. This feature provides you
              with detailed insights for any word, going beyond the basics to
              enrich your understanding.
            </li>
          </ul>
          <h5 className="mt-4 text-secondary">Why Choose LexiClick ? </h5>
          <hr className="text-secondary" />
          <p>
            LexiClick combines the convenience of instant word lookup with the
            power of artificial intelligence to create a seamless
            vocabulary-building tool. Whether you're a student, professional, or
            language enthusiast, LexiClick is tailored to help you grasp and
            remember new words effortlessly.
          </p>
          <h5 className="mt-4 text-danger">How to Use LexiClick ? </h5>
          <hr className="text-danger" />
          <ul>
            <li>
              <strong>Double-Click for Instant Insights</strong> : Simply
              double-click on any word while browsing, and LexiClick will
              display definitions, examples, synonyms, and antonyms right on the
              page.
            </li>
            <li>
              <strong>AI Search for In-Depth Exploration</strong> : Open the
              LexiClick extension, type in any word, and let the AI-powered
              search provide you with comprehensive insights, related terms, and
              contextual understanding.
            </li>
          </ul>
          <h5 className="mt-4 text-dark">Demonstration </h5>
          <hr className="text-dark" />
          <div id="demoimg" className="row">
            <div className="col-md-6 col-xs-12 my-2">
              <img
                src={require("./Assets/lexiclick/instant.png")}
                alt="instant"
                className="img-fluid"
              />
            </div>
            <div className="col-md-6 col-xs-12 my-2">
              <img
                src={require("./Assets/lexiclick/definition.png")}
                alt="instant"
                className="img-fluid"
              />
            </div>
            <div className="col-md-6 col-xs-12 my-2">
              <img
                src={require("./Assets/lexiclick/examples.png")}
                alt="instant"
                className="img-fluid"
              />
            </div>
            <div className="col-md-6 col-xs-12 my-2">
              <img
                src={require("./Assets/lexiclick/aisearch.png")}
                alt="instant"
                className="img-fluid"
              />
            </div>
          </div>
          <hr />
          <p className="text-muted">
            Transform the way you interact with language!{" "}
            <Link
              to={
                "https://chromewebstore.google.com/detail/lexiclick/ffeidnombcpdibpkekekgfkaclhjbjpj"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="me-1"
            >
              Add
            </Link>
            LexiClick to Chrome and explore words with the power of AI.
          </p>
        </div>
      ) : (
        <div>
          <h2>Privacy Policy</h2>
          <p style={{ fontSize: "12px" }}>
            <strong>Effective Date:</strong> 08 Nov, 2024
          </p>
          <hr />
          <p>
            LexiClick is committed to protecting your privacy. This Privacy
            Policy describes the information we collect, how we use it, and how
            we safeguard it. By using the LexiClick extension, you agree to the
            terms of this policy.
          </p>

          <h5 className="mt-4 text-secondary">1. Information We Collect</h5>
          <hr className="text-secondary" />
          <p>
            LexiClick does not collect any personal data or store any user
            information on our servers. The extension operates locally within
            your browser and only uses data necessary to provide definitions,
            examples, synonyms, and antonyms for words you select.
          </p>

          <h5 className="mt-4 text-secondary">
            2. How we use your Information
          </h5>
          <hr className="text-secondary" />
          <p>
            LexiClick retrieves vocabulary data (definitions, examples,
            synonyms, and antonyms) from trusted language API providers. This
            information is displayed in real time within the extension, directly
            enhancing your browsing experience. LexiClick does not collect,
            store, or share this data.
          </p>

          <h5 className="mt-4 text-secondary">3. Permissions</h5>
          <hr className="text-secondary" />
          <label>
            To function, LexiClick requires the following permissions:
          </label>
          <ul>
            <li>
              <strong>Active Tab</strong> : Allows LexiClick to detect
              double-clicks on words within the active tab to provide vocabulary
              insights.
            </li>
            <li>
              <strong>Scripting</strong> : Enables LexiClick to inject scripts
              to identify selected words on the page.
            </li>
            <li>
              <strong>Host Permissions</strong> : Allows LexiClick to access
              external vocabulary API services to retrieve relevant word
              information.
            </li>
          </ul>
          <p>
            These permissions are strictly used for the intended purpose and do
            not access any data beyond what is needed to provide vocabulary
            information.
          </p>

          <h5 className="mt-4 text-secondary">4. Data Security</h5>
          <hr className="text-secondary" />
          <p>
            LexiClick does not collect or store any personal information. The
            extension only fetches vocabulary data for display and does not
            retain any browsing history or user data. We ensure that all
            connections to external APIs are encrypted for added security.
          </p>

          <h5 className="mt-4 text-secondary">5. Third-Party Services</h5>
          <hr className="text-secondary" />
          <p>
            LexiClick may interact with third-party APIs to provide vocabulary
            insights. These services are used solely for retrieving definitions,
            synonyms, antonyms, and examples. We do not share your browsing data
            with these third parties.
          </p>

          <h5 className="mt-4 text-secondary">
            6. Changes to This Privacy Policy{" "}
          </h5>
          <hr className="text-secondary" />
          <p>
            LexiClick may update this Privacy Policy from time to time. We will
            notify users of any significant changes by updating the “Last
            Updated” date at the top of this policy.
          </p>

          <h5 className="mt-4 text-secondary">7. Contact Us</h5>
          <hr className="text-secondary" />
          <p>
            If you have any questions about this Privacy Policy or LexiClick’s
            data practices, please contact us at{" "}
          </p>
          <a href="mailto:support@docschat.in">support@docschat.in</a>
          <hr />
          <p className="text-muted">
            By using LexiClick, you acknowledge and agree to this Privacy
            Policy.
          </p>
        </div>
      )}
    </div>
  );
};

export default Lexiclick;
