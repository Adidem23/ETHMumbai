import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt } from "@graphprotocol/graph-ts"
import {
  NumberAdded,
  NumberSubtracted
} from "../generated/NumberContract/NumberContract"

export function createNumberAddedEvent(
  oldValue: BigInt,
  newValue: BigInt
): NumberAdded {
  let numberAddedEvent = changetype<NumberAdded>(newMockEvent())

  numberAddedEvent.parameters = new Array()

  numberAddedEvent.parameters.push(
    new ethereum.EventParam(
      "oldValue",
      ethereum.Value.fromUnsignedBigInt(oldValue)
    )
  )
  numberAddedEvent.parameters.push(
    new ethereum.EventParam(
      "newValue",
      ethereum.Value.fromUnsignedBigInt(newValue)
    )
  )

  return numberAddedEvent
}

export function createNumberSubtractedEvent(
  oldValue: BigInt,
  newValue: BigInt
): NumberSubtracted {
  let numberSubtractedEvent = changetype<NumberSubtracted>(newMockEvent())

  numberSubtractedEvent.parameters = new Array()

  numberSubtractedEvent.parameters.push(
    new ethereum.EventParam(
      "oldValue",
      ethereum.Value.fromUnsignedBigInt(oldValue)
    )
  )
  numberSubtractedEvent.parameters.push(
    new ethereum.EventParam(
      "newValue",
      ethereum.Value.fromUnsignedBigInt(newValue)
    )
  )

  return numberSubtractedEvent
}
