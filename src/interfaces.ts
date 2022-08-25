import { FieldValues } from "react-hook-form"

export type TDocument = {
  _id: string // UID
  type: string // e.g. 'chararacter' or 'spell'
  creator: string // user ID
  access: string[] // list of userIds 
  values: TValues
}

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
  name: string
  starting: string
  value: string
  addable?: boolean
  tickable?: boolean
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
  messageToApp?: (message: string, data?: any) => void
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

export type TAppReceivableMessages = {
  message: 'save'
  source: 'System'
  data: TDocument
} | {
  message: 'focus'
  source: 'System'
} | {
  message: 'send message'
  source: 'System'
  data: { message: string }
} | {
  message: 'upload asset'
  source: 'System'
  data: { assetId: string }
} | {
  message: 'remove asset'
  source: 'System'
  data: { assetId: string }
} | {
  message: 'set scene'
  source: 'System'
  data: { sceneId: string }
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
  skill: TWeaponSkills
  damage: string
  range: string
  usesPerRound: string
  weight: string
  ammoCapacity: string
  malfunction: string
  commonEra: string
}

export type TWeaponOnCharacter = TWeapon & {
  documentId: string
  regular: string
}

