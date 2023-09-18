import {
	TCollection,
	TDocument,
	TAccess,
	TDocumentType,
	TState,
	TEditMode,
} from '../../interfaces'
import systemConfig from '../../system.json'

export const fakeDocumentsFromSystemConfig = (
	setCollections: React.Dispatch<React.SetStateAction<TCollection[]>>,
	documentId: string,
) => {
	setCollections(systemConfig.collections as TCollection[])

	const fakeData = {
		documents: [],
		assets: [],
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
		fakeData.documents?.push(document)
	})

	fakeData['document'] = fakeData.documents![0]

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
