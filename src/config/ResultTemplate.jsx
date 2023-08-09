const MyResultTemplateForYouTubeVideos = () => {
  return (
    <>
      <style>{myStyles}</style>
      <atomic-result-section-badges>
        <atomic-field-condition must-match-is-recommendation="true">
          <atomic-result-badge label="Recommended"></atomic-result-badge>
        </atomic-field-condition>
        <atomic-field-condition must-match-is-top-result="true">
          <atomic-result-badge label="Top Result"></atomic-result-badge>
        </atomic-field-condition>
      </atomic-result-section-badges>

      <atomic-result-section-actions class="date-text">
        <atomic-result-date></atomic-result-date>
      </atomic-result-section-actions>

      <atomic-result-section-visual image-size="large" class="yt-thumbnail">
        <atomic-result-image field="ytthumbnailurl"></atomic-result-image>
      </atomic-result-section-visual>

      <atomic-result-section-title>
        <atomic-result-link></atomic-result-link>
      </atomic-result-section-title>

      <atomic-result-section-excerpt>
        <atomic-result-text field="excerpt"></atomic-result-text>
      </atomic-result-section-excerpt>
    </>
  );
};

const MyDefaultTemplate = () => {
  return (
    <>
      <style>{myStyles}</style>
      <atomic-result-section-badges>
        <atomic-field-condition must-match-is-featured="true">
          <atomic-result-badge label="Featured" />
        </atomic-field-condition>
        <atomic-field-condition must-match-is-top-result="true">
          <atomic-result-badge label="Top Result" />
        </atomic-field-condition>
      </atomic-result-section-badges>
      <atomic-result-section-title>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <atomic-result-link></atomic-result-link>
          <span style={{ lineHeight: "0px", marginRight: "30px" }}>
            <atomic-quickview sandbox="allow-top-navigation allow-same-origin"></atomic-quickview>
          </span>
        </div>
      </atomic-result-section-title>
      <atomic-result-section-visual>
        <atomic-result-icon></atomic-result-icon>
      </atomic-result-section-visual>
      <atomic-result-section-excerpt>
        <atomic-result-text field="excerpt"></atomic-result-text>
      </atomic-result-section-excerpt>
      <atomic-result-section-bottom-metadata>
        <atomic-result-fields-list>
          <atomic-field-condition class="field" if-defined="author">
            <span className="field-label">
              <atomic-text value="author"></atomic-text>:
            </span>
            <atomic-result-text field="author"></atomic-result-text>
          </atomic-field-condition>

          <atomic-field-condition class="field" if-defined="source">
            <span className="field-label">
              <atomic-text value="source"></atomic-text>:
            </span>
            <atomic-result-text field="source"></atomic-result-text>
          </atomic-field-condition>

          <atomic-field-condition class="field" if-defined="language">
            <span className="field-label">
              <atomic-text value="language"></atomic-text>:
            </span>
            <atomic-result-multi-value-text field="language"></atomic-result-multi-value-text>
          </atomic-field-condition>

          <atomic-field-condition class="field" if-defined="filetype">
            <span className="field-label">
              <atomic-text value="fileType"></atomic-text>:
            </span>
            <atomic-result-text field="filetype"></atomic-result-text>
          </atomic-field-condition>

          <span className="field">
            <span className="field-label">Date:</span>
            <atomic-result-date></atomic-result-date>
          </span>
        </atomic-result-fields-list>
      </atomic-result-section-bottom-metadata>
    </>
  );
};

const MyResultTemplateFunction = (result, quickviewObj) => {
  if (result.raw.filetype === "YouTubeVideo") {
    return <MyResultTemplateForYouTubeVideos result={result} />;
  }

  return <MyDefaultTemplate result={result} quickviewObj={quickviewObj} />;
};

export default MyResultTemplateFunction;

const myStyles = `
.field {
  display: flex;
  white-space: nowrap;
  align-items: center;
}

.field-label {
  font-weight: 500;
  padding-bottom : 3px;
  margin-right: 0.25rem;
}

.metadata{
  display : flex;
  width : 300px;
}

atomic-result-image{
  width : 200px;
  margin-right : 20px
}

atomic-result-section-visual{
  width : 300px;
  height : 300px
}

.yt-thumbnail{
  width : 200px !important;
  height : 100px !important;
}
`;
