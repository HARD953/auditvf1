function TitleSyled({title}) {
    return (
      <h1 className="fw-bold text-uppercase">
        <font style={{ color: "var(--color-lanfia-primary-4)", fontSize: 30 }}>
          <font
            style={{ fontSize: 40, color: " var(--color-lanfia-primary-4)" }}
          >
            {title?.slice(0, 1)}
          </font>
          {title?.slice(1, title?.length)}
        </font>
      </h1>
    );
}

export default TitleSyled;