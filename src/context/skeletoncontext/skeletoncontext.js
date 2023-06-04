
import * as React from "react"

import { useCallback, useContext, useMemo, useState } from "react"

const UseSkeletonContext = React.createContext(null)

function useSkeleton() {
	const skeletonContext = useContext(UseSkeletonContext)

	if (skeletonContext === null) {
		throw new Error(
			"useSpinner() can only be used inside of <UseSpinnerProvider />, " +
				"please declare it at a higher level."
		)
	}

	const { skeleton } = skeletonContext

	return useMemo(() => {
		return { ...skeleton }
	}, [skeleton])
}

function UseSkeletonProvider({ children }) {
	const skeletonContext = useContext(UseSkeletonContext)

	if (skeletonContext !== null) {
		throw new Error("<UseSkeletonContext /> has already been declared.")
	}
	const [isLoading, setIsLoading] = useState(false)
	const setLoadingState = loading => {
		setIsLoading(loading)
	}
	const skeleton = useMemo(
		() => ({
			isLoading,
			setLoadingState,
		}),
		[isLoading, setLoadingState]
	)

	return (
		<UseSkeletonContext.Provider
			value={{
				skeleton,
			}}>
			{children}
		</UseSkeletonContext.Provider>
	)
}

function UseSkeletonProviderWrapper(props) {
	return <UseSkeletonProvider {...props} />
}

export const withSkeleton = Component => {
	return props => {
		const skeleton = useSkeleton()

		return <Component skeleton={skeleton} {...props} />
	}
}

export { UseSkeletonProviderWrapper as UseSkeletonProvider, useSkeleton }