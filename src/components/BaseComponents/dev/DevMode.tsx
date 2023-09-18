import CollectionPicker from './CollectionPicker'
import EditModeToggle from './EditModeToggle'
import ResetButton from './ResetButton'
import UpdateButton from './UpdateButton'
import useSimulateParentFrame from './useSimulateParentFrame'

/*
	This is a development tool which is enabled by creating a .env file and putting this in it:

  `NODE_ENV = development`

	This will enable the development toolbar which allows you to switch between edit and view mode, and also allows you to select a document to edit, as well as managing the data handling. This is a not a proper substitute for deploying to a real game for testing, but it is useful for development.

	It will do very simple message handling to the parent window, and will also listen for messages from the parent window (although none are currently sent; it exists for future improvements to dev mode), and it will store the documentId in localStorage so that it will persist between page refreshes.
*/

export default function DevMode() {
	useSimulateParentFrame()

	return (
		<div className='sticky top-0 z-40 flex bg-black py-4 px-4 text-sm text-white'>
			<CollectionPicker />

			<div className='flex flex-1 justify-end space-x-2'>
				<EditModeToggle />
				<UpdateButton />
				<ResetButton />
			</div>
		</div>
	)
}
