import { FieldValues } from "react-hook-form"

export type TDocument = {
  _id: string // UID
  type: string // e.g. 'chararacter' or 'spell'
  creator: string // UID of the creating user
  access: TAccess // 'private' or 'public'
  accessList: string[] // list of userIds
  values: { // folders use values as 'children'
    [key: string]: any
  }
}

export type TAccess = 'private' | 'public'

export type TValues = {
  // info: {
  //   name: string
  //   occupation: string
  //   residence: string
  //   birthplace: string
  //   pronouns: string
  //   age: string
  // }
  [key: string]: any
  weapons?: TWeapon[]
  skills?: TSkills
}

export type TSkills = {
  [key: string]: TSkill
}

export type TSkill = {
  pool: number
  rating: number
  specialities?: string[]
}

export type TAsset = {
  _id: string
  name: string
  fileurl: string
  filesize: number
  filetype: string
  width: number
  height: number
  creator: string
}

export type TState = {
  documentId: string
  editMode: 'view' | 'edit'
  document: TDocument
  documents: TDocument[]
  assets: TAsset[],
}

export type TReducerAction =
  | {
    type: 'LOAD'
    payload: Partial<TState>
  } | {
    type: 'UPDATE_DOCUMENT_VALUES',
    payload: {
      values: FieldValues
    }
  }

export type TContext = {
  state: TState
  dispatch: React.Dispatch<TReducerAction>
}

export type TPostMessage =
  | {
    message: 'load'
  } | {
    message: 'save'
    document: TDocument
  } | {
    message: 'sendMessage'
    data: { message: string }
  }

export type TEditMode = 'view' | 'edit'

export type TMessage = 'save' | 'focus' | 'send message' | 'upload asset' | 'remove asset' | 'set scene' | 'open document' | 'generate'

export type TAppReceivableMessages = {
  message: 'save'
  data: TDocument
  source: 'System'
} | {
  message: 'focus'
  source: 'System'
} | {
  message: 'send message'
  data: { message: string }
  source: 'System'
} | {
  message: 'upload asset'
  data: { assetId: string }
  source: 'System'
} | {
  message: 'remove asset'
  data: { assetId: string }
  source: 'System'
} | {
  message: 'set scene'
  data: { sceneId: string }
  source: 'System'
} | {
  message: 'open document'
  data: { documentId: string }
  source: 'System'
} | {
  message: 'generate'
  data: { type: string }
  source: 'System'
}

export type TSystemReceivableMessages = {
  message: 'load'
  source: 'Aux'
  data: {
    documentId: string
    documents: TDocument[]
    assets: TAsset[]
    editMode: TEditMode
  }
} | {
  message: 'update data'
  source: 'App'
  data: {
    documentId: string
    documents: TDocument[]
    assets: TAsset[]
    editMode: TEditMode
  }
} | {
  message: 'update document mode'
  source: 'App'
  data: {
    editMode: TEditMode
  }
} | {
  message: 'upload asset success'
  source: 'App'
  data: {
    name: string
  }
}


export type TWeaponSkills = 'Firearms (Bow)' | 'Fighting (Brawl)' | 'Firearms (Handgun)' | 'Firearms (Rifle/Shotgun)' | 'Fighting (Whip)' | 'Fighting (Garrote)' | 'Fighting (Axe)' | 'Fighting (Flail)' | 'Throw' | 'Fighting (Spear)' | 'Fighting (Chainsaw)' | 'Fighting (Sword)' | 'Firearms (SMG)' | 'Firearms (MG)' | 'Firearms (HG)' | 'Firearms (Heavy)' | 'Electrical Repair' | 'Demolitions' | 'Artillery' | 'Firearms (Flamethrower)' | 'Other'

export type TWeapon = {
  name: string
  damage: string
  pointBlank: number
  close: number
  near: number
  long: number
  notes: string
}

export type TWeaponOnCharacter = TWeapon & {
  documentId: string
}

