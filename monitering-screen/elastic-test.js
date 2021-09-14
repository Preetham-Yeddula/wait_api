'use strict'

const { Client } = require('@elastic/elasticsearch')
const { timeStamp } = require('console')
const client = new Client({ node: 'http://52.140.66.173:9200' })

async function run () {
  // Let's start by indexing some data
  

  // here we are forcing an index refresh, otherwise we will not
  // get any result in the consequent search
  await client.indices.refresh({ index: 'fluentd-test-2021.09.14' })

  // Let's search!
  const { body } = await client.search({
    index: 'fluentd-test-2021.09.14',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      query: {
        match: {res:404}
      }
    }
  })
  var re =  body.hits.hits;
  for (let i in re){
      console.log(re[i]._source.time)
  }
  //console.log(body.hits.hits)
}

run().catch(console.log)
