# Apure - Data API

Project created to manage user

## Architectural layers

## Database Structure

```mermaid
classDiagram
  Workspace <|-- WorkspaceGroup
  Workspace <|-- WorkspacePlayer
  Workspace <|-- WorkspaceProduct
  Workspace <|-- WorkspaceAccount
  class Workspace {
    _uid: string
    _timestamp: Date
    _created: Date
    _removed?: Date
    name: string
    owner_uid: string
  }
  class WorkspaceGroup {
    _uid: string
    _timestamp: Date
    _created: Date
    _removed?: Date
    workspace_uid: string
    name: string
    subgroups: string[]
  }
  class WorkspacePlayer {
    _uid: string
    _timestamp: Date
    _created: Date
    _removed?: Date
    workspace_uid: string
    name: string
    cnpj: string
    state: string
    latitude?: number
    longitude?: number
  }
  class WorkspaceProduct {
    _uid: string
    _timestamp: Date
    _created: Date
    _removed?: Date
    workspace_uid: string
    name: string
    cnpj: string
    state: string
    latitude?: number
    longitude?: number
  }
  class WorkspaceAccount {
    _uid: string
    _timestamp: Date
    _created: Date
    _removed?: Date
    workspace_uid: string
    account_uid: string
    roles: string[]
  }
```