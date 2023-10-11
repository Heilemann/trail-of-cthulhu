import {
	TCollection,
	TDocument,
	TAccess,
	TDocumentType,
	TState,
	TEditMode,
} from '../../../interfaces'
import systemConfig from '../../../system.json'

export const fakeDocumentsFromSystemConfig = (
	setCollections: React.Dispatch<React.SetStateAction<TCollection[]>>,
	documentId: string,
) => {
	setCollections(systemConfig.collections as TCollection[])

	// this is the structure of the data sent to the system
	// using post messages
	const fakeData = {
		documents: {
			byId: {},
			allIds: [],
		},
		assets: {
			byId: {},
			allIds: [],
		},
		editMode: 'edit' as TEditMode,
	} as Partial<TState>

	systemConfig.collections.forEach(collection => {
		const document: TDocument = {
			_id: collection.type,
			type: collection.type as TDocumentType,
			creator: 'abc',
			access: 'public' as TAccess,
			accessList: [],
			values: {
				name: 'No name',
			},
		}
		fakeData.documents!.allIds?.push(document._id)
		fakeData.documents!.byId[document._id] = document
	})

	const firstType = fakeData.documents!.allIds[0]
	fakeData['document'] = fakeData.documents!.byId[firstType]

	const savedData = JSON.parse(localStorage.getItem('state') || '{}')

	fakeData['documentId'] = documentId

	fakeData.document = {
		...fakeData.document,
		...savedData,
	}

	setTimeout(() => {
		window.postMessage({
			message: 'load',
			source: 'App',
			data: fakeData,
		})
	}, 200)
}
