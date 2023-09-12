import { EyeIcon, PencilIcon } from '@heroicons/react/24/solid'
import { useContext, useEffect } from 'react'
import Tabs from '../Tabs'
import context from '../context'
import { useWatch } from 'react-hook-form'

function EditModeToggle() {
	const { state, dispatch } = useContext(context)

	const editMode = useWatch({
		name: 'editMode',
		defaultValue: state.editMode,
	})

	useEffect(() => {
		if (!editMode || editMode === state.editMode) return

		dispatch({
			type: 'LOAD',
			payload: {
				...state,
				editMode,
			},
		})
	}, [editMode]) // eslint-disable-line react-hooks/exhaustive-deps

	const tabs = {
		name: 'editMode',
		options: [
			{
				label: <PencilIcon className='h-4 w-4' aria-hidden='true' />,
				value: 'edit',
			},
			{
				label: <EyeIcon className='h-4 w-4' aria-hidden='true' />,
				value: 'view',
			},
		],
	}

	return <Tabs tabs={tabs} activeTab={state.editMode} />
}

export default EditModeToggle
