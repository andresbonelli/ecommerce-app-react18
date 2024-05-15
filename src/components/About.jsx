export default function About() {
  return (
    <div className="about-layout">
      <div>
        <h1>Sobre nosotros:</h1>
        <p>
          App hecha en ReactJS.
          <br />
          <em>
            Medios de pago: Cash (pesos o dolarucos), Debito, Credito, MODO,
            MercadoPago, etc. . <br />
            Formas de envío: Rappi, Glovo, PedidosYa, etc.
          </em>
        </p>
      </div>
      <img
        src="https://res.cloudinary.com/dbfn5lnvx/image/upload/q_auto,w_550/v1607770215/react-tutorial/supermarket/about.jpg"
        height="275"
        width="183"
        className="rounded"
        alt=""
      />
    </div>
  );
}
