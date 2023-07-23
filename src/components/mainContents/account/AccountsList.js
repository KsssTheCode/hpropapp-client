import classes from './AccountsList.module.css';

const listsData = [
   {
      accountNo: 'A11111111',
      accountName: '모기업모',
      createDate: '2020-01-01',
      expireDate: '2022-01-01',
      balance: '3,000,000',
      tel: '02-0000-0000',
      cardNo: '1111-1111-1111-1111',
      reference: 'none',
   },
   {
      accountNo: 'A11111111',
      accountName: '모기업모',
      createDate: '2020-01-01',
      expireDate: '2022-01-01',
      balance: '3,000,000',
      tel: '02-0000-0000',
      cardNo: '1111-1111-1111-1111',
      reference: 'none',
   },
   {
      accountNo: 'A11111111',
      accountName: '모기업모',
      createDate: '2020-01-01',
      expireDate: '2022-01-01',
      balance: '3,000,000',
      tel: '02-0000-0000',
      cardNo: '1111-1111-1111-1111',
      reference: 'none',
   },
   {
      accountNo: 'A11111111',
      accountName: '모기업모',
      createDate: '2020-01-01',
      expireDate: '2022-01-01',
      balance: '3,000,000',
      tel: '02-0000-0000',
      cardNo: '1111-1111-1111-1111',
      reference: 'none',
   },
   {
      accountNo: 'A11111111',
      accountName: '모기업모',
      createDate: '2020-01-01',
      expireDate: '2022-01-01',
      balance: '3,000,000',
      tel: '02-0000-0000',
      cardNo: '1111-1111-1111-1111',
      reference: 'none',
   },
   {
      accountNo: 'A11111111',
      accountName: '모기업모',
      createDate: '2020-01-01',
      expireDate: '2022-01-01',
      balance: '3,000,000',
      tel: '02-0000-0000',
      cardNo: '1111-1111-1111-1111',
      reference: 'none',
   },
   {
      accountNo: 'A11111111',
      accountName: '모기업모',
      createDate: '2020-01-01',
      expireDate: '2022-01-01',
      balance: '3,000,000',
      tel: '02-0000-0000',
      cardNo: '1111-1111-1111-1111',
      reference: 'none',
   },
   {
      accountNo: 'A11111111',
      accountName: '모기업모',
      createDate: '2020-01-01',
      expireDate: '2022-01-01',
      balance: '3,000,000',
      tel: '02-0000-0000',
      cardNo: '1111-1111-1111-1111',
      reference: 'none',
   },
   {
      accountNo: 'A11111111',
      accountName: '모기업모',
      createDate: '2020-01-01',
      expireDate: '2022-01-01',
      balance: '3,000,000',
      tel: '02-0000-0000',
      cardNo: '1111-1111-1111-1111',
      reference: 'none',
   },
   {
      accountNo: 'A11111111',
      accountName: '모기업모',
      createDate: '2020-01-01',
      expireDate: '2022-01-01',
      balance: '3,000,000',
      tel: '02-0000-0000',
      cardNo: '1111-1111-1111-1111',
      reference: 'none',
   },
   {
      accountNo: 'A11111111',
      accountName: '모기업모',
      createDate: '2020-01-01',
      expireDate: '2022-01-01',
      balance: '3,000,000',
      tel: '02-0000-0000',
      cardNo: '1111-1111-1111-1111',
      reference: 'none',
   },
   {
      accountNo: 'A11111111',
      accountName: '모기업모',
      createDate: '2020-01-01',
      expireDate: '2022-01-01',
      balance: '3,000,000',
      tel: '02-0000-0000',
      cardNo: '1111-1111-1111-1111',
      reference: 'none',
   },
   {
      accountNo: 'A11111111',
      accountName: '모기업모',
      createDate: '2020-01-01',
      expireDate: '2022-01-01',
      balance: '3,000,000',
      tel: '02-0000-0000',
      cardNo: '1111-1111-1111-1111',
      reference: 'none',
   },
   {
      accountNo: 'A11111111',
      accountName: '모기업모',
      createDate: '2020-01-01',
      expireDate: '2022-01-01',
      balance: '3,000,000',
      tel: '02-0000-0000',
      cardNo: '1111-1111-1111-1111',
      reference: 'none',
   },
];

const AccountsList = () => {
   const lists = listsData.map((item, i) => (
      <tr>
         <td>
            <input type="checkbox" />
         </td>
         <td>{i + 1}</td>
         <td>{item.accountNo}</td>
         <td>{item.accountName}</td>
         <td>{item.createDate}</td>
         <td>{item.expireDate}</td>
         <td>{item.balance}</td>
         <td>{item.tel}</td>
         <td>{item.cardNo}</td>
         <td>{item.reference}</td>
      </tr>
   ));
   return (
      <div className={classes['list__wrapper']}>
         <table className={classes['list__table']}>
            <thead>
               <tr>
                  <th></th>
                  <th>No.</th>
                  <th>Account No.</th>
                  <th>Account Name</th>
                  <th>Create Date</th>
                  <th>Expire Date</th>
                  <th>Balance</th>
                  <th>Tel</th>
                  <th>Card No.</th>
                  <th>Reference</th>
               </tr>
            </thead>
            <tbody>{lists}</tbody>
         </table>
      </div>
   );
};
export default AccountsList;
