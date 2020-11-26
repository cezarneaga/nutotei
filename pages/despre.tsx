import Layout from "components/layout";

export default function IndexPage({ preview }) {
  return (
    <Layout preview={preview}>
      <div className="py-20">
        <h1 className="text-5xl text-center text-gray-700 dark:text-gray-100">
          Nu tot ei. Pentru că impostura, nepotismul, nesimțirea și corupția
          sunt coloana vertebrală a clasei noastre politice. Și pentru că putem
          să îi schimbăm. Pentru că trebuie să o facem. Pentru că avem nevoie de
          decență, bun simț, meritocrație si oameni care au făcut ceva nu oameni
          care promit că vor face ceva în politică. Dacă doriți să sprijiniți
          inițiativa #nutotei puteți să donați la Asociația Casa Bună Cont RON:
          RO47BTRLRONCRT0566398301 Cont EUR: RO94BTRLEURCRT0566398301
        </h1>
      </div>
    </Layout>
  );
}
