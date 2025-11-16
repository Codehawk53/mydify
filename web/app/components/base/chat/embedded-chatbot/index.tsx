
'use client'
import {
  useEffect,
} from 'react'
import { useTranslation } from 'react-i18next'
import {
  EmbeddedChatbotContext,
  useEmbeddedChatbotContext,
} from './context'
import { useEmbeddedChatbot } from './hooks'
import { isDify } from './utils'
import { useThemeContext } from './theme/theme-context'
import { CssTransform } from './theme/utils'
import useBreakpoints, { MediaType } from '@/hooks/use-breakpoints'
import Loading from '@/app/components/base/loading'
import LogoHeader from '@/app/components/base/logo/logo-embedded-chat-header'
import Header from '@/app/components/base/chat/embedded-chatbot/header'
import ChatWrapper from '@/app/components/base/chat/embedded-chatbot/chat-wrapper'
import DifyLogo from '@/app/components/base/logo/dify-logo'
import { BrainCircuit } from 'lucide-react'
import cn from '@/lib/utils'
import useDocumentTitle from '@/hooks/use-document-title'
import { useGlobalPublicStore } from '@/context/global-public-context'

const Chatbot = () => {
  const {
    isMobile,
    allowResetChat,
    appData,
    appChatListDataLoading,
    chatShouldReloadKey,
    handleNewConversation,
    themeBuilder,
  } = useEmbeddedChatbotContext()
  const { t } = useTranslation()
  const systemFeatures = useGlobalPublicStore(s => s.systemFeatures)

  const customConfig = appData?.custom_config
  const site = appData?.site

  const difyIcon = <BrainCircuit className="size-8 text-primary" />;

  useEffect(() => {
    // We are not using the dify theme builder, we will use our own theme.
    // themeBuilder?.buildTheme(site?.chat_color_theme, site?.chat_color_theme_inverted)
  }, [site, customConfig])

  useDocumentTitle(site?.title || 'Chat')

  return (
    <div className='relative h-full'>
      <div
        className={cn(
          'flex flex-col h-full bg-background text-foreground'
        )}
      >
        <Header
          isMobile={isMobile}
          allowResetChat={allowResetChat}
          title={site?.title || 'HSC English Pro'}
          customerIcon={difyIcon}
          theme={themeBuilder?.theme} // This might not be needed if we override styles
          onCreateNewChat={handleNewConversation}
        />
        <div className={cn('flex grow flex-col overflow-y-auto bg-background', isMobile && 'm-[0.5px] !h-[calc(100%_-_3rem)] rounded-2xl')}>
          {appChatListDataLoading && (
            <div className="flex h-full w-full items-center justify-center">
                <BrainCircuit className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          {!appChatListDataLoading && (
            <ChatWrapper key={chatShouldReloadKey} />
          )}
        </div>
      </div>
      {/* powered by - hidden for a cleaner look */}
      {isMobile && !appData?.custom_config?.remove_webapp_brand && (
        <div className='flex h-[60px] shrink-0 items-center pl-2 bg-background'>
            <div className={cn(
              'flex shrink-0 items-center gap-1.5 px-2',
            )}>
              <div className='system-2xs-medium-uppercase text-muted-foreground'>{t('share.chat.poweredBy')}</div>
              {
                systemFeatures.branding.enabled && systemFeatures.branding.workspace_logo
                  ? <img src={systemFeatures.branding.workspace_logo} alt='logo' className='block h-5 w-auto' />
                  : appData?.custom_config?.replace_webapp_logo
                    ? <img src={`${appData?.custom_config?.replace_webapp_logo}`} alt='logo' className='block h-5 w-auto' />
                    : <DifyLogo size='small' />
              }
            </div>
        </div>
      )}
    </div>
  )
}

const EmbeddedChatbotWrapper = () => {
  const media = useBreakpoints()
  const isMobile = media === MediaType.mobile
  const themeBuilder = useThemeContext()

  const {
    appData,
    appParams,
    appMeta,
    appChatListDataLoading,
    currentConversationId,
    currentConversationItem,
    appPrevChatList,
    pinnedConversationList,
    conversationList,
    newConversationInputs,
    newConversationInputsRef,
    handleNewConversationInputsChange,
    inputsForms,
    handleNewConversation,
    handleStartChat,
    handleChangeConversation,
    handleNewConversationCompleted,
    chatShouldReloadKey,
    isInstalledApp,
    allowResetChat,
    appId,
    handleFeedback,
    currentChatInstanceRef,
    clearChatList,
    setClearChatList,
    isResponding,
    setIsResponding,
    currentConversationInputs,
    setCurrentConversationInputs,
    allInputsHidden,
    initUserVariables,
  } = useEmbeddedChatbot()

  return <EmbeddedChatbotContext.Provider value={{
    appData,
    appParams,
    appMeta,
    appChatListDataLoading,
    currentConversationId,
    currentConversationItem,
    appPrevChatList,
    pinnedConversationList,
    conversationList,
    newConversationInputs,
    newConversationInputsRef,
    handleNewConversationInputsChange,
    inputsForms,
    handleNewConversation,
    handleStartChat,
handleChangeConversation,
    handleNewConversationCompleted,
    chatShouldReloadKey,
    isMobile,
    isInstalledApp,
    allowResetChat,
    appId,
    handleFeedback,
    currentChatInstanceRef,
    themeBuilder,
    clearChatList,
    setClearChatList,
    isResponding,
    setIsResponding,
    currentConversationInputs,
    setCurrentConversationInputs,
    allInputsHidden,
    initUserVariables,
  }}>
    <Chatbot />
  </EmbeddedChatbotContext.Provider>
}

// Assuming these other components exist in the Dify structure
// These are dummy components to satisfy the compiler in this file.
// You would use the actual components from Dify.
namespace app {
    export namespace components {
        export namespace base {
            export namespace loading {
                // @ts-ignore
                export default function Loading({ type }) { return <div className="flex h-full w-full items-center justify-center"><BrainCircuit className="h-8 w-8 animate-spin text-primary" /></div>; }
            }
            export namespace logo {
                // @ts-ignore
                export function LogoHeader() { return <BrainCircuit className="size-8 text-primary" />; }
                // @ts-ignore
                export function DifyLogo({size}) { return <div className="text-muted-foreground text-sm">Powered by Dify</div>; }
            }
            export namespace chat {
                export namespace embeddedChatbot {
                    // @ts-ignore
                    export function Header({ title, customerIcon, onCreateNewChat }) { 
                        return (
                             <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm">
                                <div className="flex items-center gap-2">
                                    {customerIcon}
                                    <h1 className="text-lg font-bold tracking-wider uppercase font-headline">{title}</h1>
                                </div>
                                <button onClick={onCreateNewChat} className="text-sm font-medium text-primary hover:underline">New Chat</button>
                            </header>
                        );
                    }
                     // @ts-ignore
                    export function ChatWrapper({ key }) { 
                        return (
                            <div className="p-4 space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center"><BrainCircuit className="size-5 text-primary"/></div>
                                    <div className="p-3 rounded-lg bg-card border">Hello! How can I help you with prepositions today?</div>
                                </div>
                                <div className="flex items-start gap-3 justify-end">
                                    <div className="p-3 rounded-lg bg-primary text-primary-foreground">Tell me about prepositions of place.</div>
                                    <div className="size-8 rounded-full bg-muted flex items-center justify-center">U</div>
                                </div>
                            </div>
                        );
                    }
                }
            }
        }
    }
}
const { Loading } = app.components.base.loading
const { LogoHeader, DifyLogo } = app.components.base.logo
const { Header, ChatWrapper } = app.components.base.chat.embeddedChatbot


const EmbeddedChatbot = () => {
  return <div className="font-body antialiased"><EmbeddedChatbotWrapper /></div>
}

export default EmbeddedChatbot

    
