import web3 from '../Utils/web3';

export function getTransactionHistory(address) {
  const apiKey = '5VX4NARPMGGD22TB5MPI1I4MT244E482Y8';
  const url = `http://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;
  return fetch(url)
      .then(res => res.json())
      .then(res => res.result)
      .then (res => res.map(transformTransaction))
      .then (res => res.reverse().slice(0, 10))
}

function transformTransaction(obj) {
  return {
      blockHash: obj.blockHash,
      from: obj.from,
      to: obj.to,
      hash: obj.hash,
      timeStamp: new Date(obj.timeStamp * 1000).toLocaleString(),
      value: web3.utils.fromWei(obj.value, 'ether'),
  }
}
