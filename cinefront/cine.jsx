import React from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


function App() {
  return (
    <div>
      <header>
        <h1>Cinépolis</h1>
      </header>
      <main>
        <section>
          <h2>Cartelera</h2>
          {/* Aquí puedes listar las películas en cartelera */}
        </section>
        <section>
          <h2>Próximos Estrenos</h2>
          {/* Aquí puedes listar las próximas películas */}
        </section>
      </main>
      <footer>
        <p>&copy; 2023 Cinépolis</p>
      </footer>
    </div>
  );
}

export default App;

