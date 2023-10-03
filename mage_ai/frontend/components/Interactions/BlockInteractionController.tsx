import { useCallback, useMemo, useState } from 'react';

import Headline from '@oracle/elements/Headline';
import InteractionLayoutContainer from './InteractionLayoutContainer';
import InteractionSettings from './InteractionSettings';
import InteractionType from '@interfaces/InteractionType';
import Spacing from '@oracle/elements/Spacing';
import Text from '@oracle/elements/Text';
import TextInput from '@oracle/elements/Inputs/TextInput';
import { BlockInteractionType } from '@interfaces/PipelineInteractionType';
import { ContainerStyle } from './index.style';
import { PADDING_UNITS, UNITS_BETWEEN_ITEMS_IN_SECTIONS } from '@oracle/styles/units/spacing';

type BlockInteractionControllerProps = {
  blockInteraction?: BlockInteractionType;
  children?: any;
  containerRef?: any;
  interaction: InteractionType;
  isEditing?: boolean;
  removeBlockInteraction?: () => void;
  setInteractionsMapping: (prev: {
    [interactionUUID: string]: InteractionType;
  }) => void;
};

function BlockInteractionController({
  blockInteraction,
  children,
  containerRef,
  interaction,
  isEditing,
  removeBlockInteraction,
  setInteractionsMapping,
}: BlockInteractionControllerProps) {
  const {
    description: blockInteractionDescription,
    name: blockInteractionName,
  } = useMemo(() => blockInteraction || {
    description: null,
    name: null,
  }, [
    blockInteraction,
  ]);

  const updateInteraction =
    // @ts-ignore
    useCallback((interactionUpdated: InteractionType) => setInteractionsMapping(prev => ({
      ...prev,
      [interactionUpdated?.uuid]: {
        ...interaction,
        ...interactionUpdated,
      },
    })), [
      interaction,
      setInteractionsMapping,
    ]);

  return (
    <div>
      {isEditing && (
        <InteractionSettings
          interaction={interaction}
          removeBlockInteraction={removeBlockInteraction}
          updateInteraction={updateInteraction}
        >
          {children}
        </InteractionSettings>
      )}

      {!isEditing && (
        <ContainerStyle>
          {blockInteractionName && (
            <Spacing mb={PADDING_UNITS} pt={PADDING_UNITS} px={PADDING_UNITS}>
              <Headline level={5}>
                {blockInteractionName}
              </Headline>

              {blockInteractionDescription && blockInteractionDescription?.split('\n')?.map((line: string) => (
                <Text default key={line}>
                  {line}
                </Text>
              ))}
            </Spacing>
          )}

          <Spacing pb={UNITS_BETWEEN_ITEMS_IN_SECTIONS} px={1}>
            <InteractionLayoutContainer
              containerRef={containerRef}
              interaction={interaction}
            />
          </Spacing>
        </ContainerStyle>
      )}
    </div>
  );
}

export default BlockInteractionController;