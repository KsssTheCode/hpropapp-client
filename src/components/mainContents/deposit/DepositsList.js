import classes from './DepositsList.module.css';

const deposits = [
   {
      depositNumber: 'D11111111',
      owner: '강성훈',
      balance: '100,000',
      createDate: '2020-01-01',
   },
   {
      depositNumber: 'D11111111',
      owner: '강성훈',
      balance: '100,000',
      createDate: '2020-01-01',
   },
   {
      depositNumber: 'D11111111',
      owner: '강성훈',
      balance: '100,000',
      createDate: '2020-01-01',
   },
   {
      depositNumber: 'D11111111',
      owner: '강성훈',
      balance: '100,000',
      createDate: '2020-01-01',
   },
   {
      depositNumber: 'D11111111',
      owner: '강성훈',
      balance: '100,000',
      createDate: '2020-01-01',
   },
];

const DepositsList = () => {
   const lists = deposits.map((dp, i) => (
      <tr>
         <td>
            <input type="checkbox" />
         </td>
         <td>{i}</td>
         <td>{dp.depositNumber}</td>
         <td>{dp.owner}</td>
         <td>{dp.balance}</td>
         <td>{dp.createDate}</td>
      </tr>
   ));

   return (
      <div className={classes['deposit__list']}>
         <table>
            <thead>
               <tr>
                  <th></th>
                  <th>No.</th>
                  <th>Deposit No.</th>
                  <th>Owner</th>
                  <th>Balance</th>
                  <th>Create Date</th>
               </tr>
            </thead>
            <tbody>{lists}</tbody>
         </table>
      </div>
   );
};

export default DepositsList;
