import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt } from "@graphprotocol/graph-ts"
import { NumberAdded } from "../generated/schema"
import { NumberAdded as NumberAddedEvent } from "../generated/NumberContract/NumberContract"
import { handleNumberAdded } from "../src/number-contract"
import { createNumberAddedEvent } from "./number-contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let oldValue = BigInt.fromI32(234)
    let newValue = BigInt.fromI32(234)
    let newNumberAddedEvent = createNumberAddedEvent(oldValue, newValue)
    handleNumberAdded(newNumberAddedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("NumberAdded created and stored", () => {
    assert.entityCount("NumberAdded", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "NumberAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "oldValue",
      "234"
    )
    assert.fieldEquals(
      "NumberAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "newValue",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
