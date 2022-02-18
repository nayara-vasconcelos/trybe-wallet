import React, { Component } from 'react';

export default class ExpensesTable extends Component {
  renderTableHeader = () => {
    const titles = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir',
    ];

    const tableHeader = titles.map((title) => (
      <th scope="col" key={ title }>{ title }</th>
    ));

    return tableHeader;
  }

  render() {
    return (
      <section>
        <table>
          <tr>
            { this.renderTableHeader() }
          </tr>
          {/* <tr>
            <td>Emil</td>
            <td>Tobias</td>
            <td>Linus</td>
          </tr>
          <tr>
            <td>16</td>
            <td>14</td>
            <td>10</td>
          </tr> */}
        </table>
      </section>
    );
  }
}
