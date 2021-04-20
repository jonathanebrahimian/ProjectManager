import React from 'react'
import testApi from '../api/testApi'

const test = new testApi()

const TestPage = () => {

  const getValuesTest = () => {
    console.log(test.getValues())
  }

  const postMaterials = (payload) => {
    console.log(test.postMaterials(payload))
  }

  return (
    <div>
      <h1>Random Test Page</h1>
      <div>
        <button onClick={getValuesTest}>testValues</button>
        <button onClick={postMaterials}>POST dummy material</button>
      </div>
    </div>
  )
}

export default TestPage