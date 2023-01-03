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

// message that can be received by the system
export type TSystemReceivableMessage = 'load data' | 'update data' | 'update document mode' | 'upload asset success'

export type TAppReceivableMessages = {
  message: 'save'
  data: TDocument
} | {
  message: 'focus'
  data: undefined
} | {
  message: 'send message'
  data: { message: string }
} | {
  message: 'upload asset'
  data: string
} | {
  message: 'remove asset'
  data: { assetId: string }
} | {
  message: 'set scene'
  data: { sceneId: string }
} | {
  message: 'open document'
  data: { documentId: string }
} | {
  message: 'generate'
  data: {
    name: string,
    prompt: string,
  }
}

export type TSystemReceivableMessages = {
  message: 'load data'
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

