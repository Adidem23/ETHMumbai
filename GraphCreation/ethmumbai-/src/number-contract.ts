import {
  NumberAdded as NumberAddedEvent,
  NumberSubtracted as NumberSubtractedEvent
} from "../generated/NumberContract/NumberContract"
import { NumberAdded, NumberSubtracted } from "../generated/schema"

export function handleNumberAdded(event: NumberAddedEvent): void {
  let entity = new NumberAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.oldValue = event.params.oldValue
  entity.newValue = event.params.newValue

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNumberSubtracted(event: NumberSubtractedEvent): void {
  let entity = new NumberSubtracted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.oldValue = event.params.oldValue
  entity.newValue = event.params.newValue

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
