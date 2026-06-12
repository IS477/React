import { useState } from "react";

function TextoEspejo() {
  const [text, setText] = useState("");

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h2>🪞 Texto espejo</h2>

        <input
          className="form-control"
          value={text}
          onChange={e => setText(e.target.value)}
        />

        <p className="mt-3">
          Texto: {text}
        </p>
      </div>
    </div>
  );
}

export default TextoEspejo;