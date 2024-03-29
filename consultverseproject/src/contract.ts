import {
  AddedClient as AddedClientEvent,
  AddedExpert as AddedExpertEvent,
  ExpertRequested as ExpertRequestedEvent
} from "../generated/Contract/Contract"
import { AddedClient, AddedExpert, ExpertRequested } from "../generated/schema"

export function handleAddedClient(event: AddedClientEvent): void {
  let entity = new AddedClient(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ClientAddress = event.params.ClientAddress
  entity.ClientName = event.params.ClientName
  entity.ClientEmailId = event.params.ClientEmailId
  entity.ClientPhoneNumber = event.params.ClientPhoneNumber
  entity.IntersestedConsulation = event.params.IntersestedConsulation

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAddedExpert(event: AddedExpertEvent): void {
  let entity = new AddedExpert(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ExpertAddress = event.params.ExpertAddress
  entity.ExpertName = event.params.ExpertName
  entity.EmailId = event.params.EmailId
  entity.PhoneNumber = event.params.PhoneNumber
  entity.Expertise = event.params.Expertise
  entity.ExpertFees = event.params.ExpertFees

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleExpertRequested(event: ExpertRequestedEvent): void {
  let entity = new ExpertRequested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ExpertAddress = event.params.ExpertAddress
  entity.RequestNumber = event.params.RequestNumber
  entity.ExpertName = event.params.ExpertName
  entity.ExpertemailAddress = event.params.ExpertemailAddress
  entity.phoneNumber = event.params.phoneNumber
  entity.expertise = event.params.expertise
  entity.coursefees = event.params.coursefees

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
