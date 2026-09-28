# 面试-K8s&Docker

*🔗 原文链接： [⁣⁢⁣⁣⁡K8s&Docker](https://my.feishu.cn/wiki/ZROEw1zjJiNxutkbkxAccn0OnOh)*

*⏰ 剪存时间：2026-03-13 17:30:16*

*✂️ 本文档由* [*游侠飞书剪存*](https://pwwjpto7tva.feishu.cn/wiki/space/7517832277555544092) *一键生成*

*💖 更多好物请访问* [*游侠创客*](https://uibot.cn) *微信：xuefuta*

https://yeasy.gitbook.io/docker_practice

**Docker**

**Docker 是什么** ：一种容器化技术，可以在不同环境中运行应用，确保一致性。

\*\*Docker 优势 \*\*

**不模拟底层硬件** ，而是直接在宿主机上提供 **隔离的运行环境** 。

**容器（Container）** 之间相互独立，互不影响。

**更高效** ，相比虚拟机 **更加轻量级** ，Docker 启动更快，占用资源更少。

**📌Docker 核心概念**

**Dockerfile（自动化脚本）** ：

用于定义如何创建 Docker **镜像** ，包括操作系统、依赖库、应用程序等。

**Image（镜像）**

可以把它理解成 **一个虚拟机的快照** ，里面包含了你要部署的 **应用程序以及它所关联的所有库软件** 。

通过镜像可以快速创建多个 **容器（Container）** 。

**Container（容器）**

由镜像实例化后运行的独立环境，里面运行你的应用程序。

不同容器之间相互隔离，互不影响。

**Docker 数据持久化：Volume（数据卷）**

默认情况下，当我们删除一个容器时，其中所有的数据和修改都会一并丢失。

**如何解决数据丢失问题？**  
Docker 提供了一种 **数据持久化** 方案 —— **Volume（数据卷）** 。

你可以把 **Volume** 理解为一个 **在宿主机和多个容器之间共享的文件夹** ，用于持久化存储数据。

数据不会随着容器的删除而丢失。

多个容器可以共享同一个 Volume，实现数据共享。

宿主机可以直接访问 Volume，方便备份和管理数据。

**Docker Compose**

Compose 中有两个重要的概念：

服务 ( service )：一个应用的容器，实际上可以包括若干运行相同镜像的容器实例。

项目 ( project )：由一组关联的应用容器组成的一个完整业务单元，在 docker-compose.yml 文件中定义。

Docker Compos **使用YAML 配置文件** 来定义和管理多个容器的运行。

**Docker vs K8s**

|              |                                                         |                                            |
|--------------|---------------------------------------------------------|--------------------------------------------|
| **对比项**   | **Docker**                                              | **Kubernetes**                             |
| **主要功能** | **创建、运行、管理容器**                                | **管理和编排多个容器的运行**               |
| **作用范围** | 主要用于 **单机环境**                                   | 适用于 **多机集群** （负载均衡、故障恢复） |
| **管理方式** | **单机环境** 下可以使用 Docker Compose 来管理多个容器。 | **自动化调度和管理** 容器                  |
| **适用场景** | 开发、测试、单机应用                                    | **大规模分布式系统**                       |

***简单来说：Docker 负责运行容器，Kubernetes 负责管理多个容器的集群。***

在 **单机环境** 下，我们可以使用 Docker Compose 来管理多个容器。

但部署的是像购物系统这类架构复杂、规模庞大的应用，需要根据访问量自动分配服务器网络资源，并且在某个容器宕机之后自动进行灾难恢复、故障转移，当系统变得复杂，需要 **跨多台服务器** 运行时，Docker 就力不从心

**Docker 解决了“如何运行容器”** ，但不擅长管理 **大量容器** 。

**Kubernetes 解决了“如何管理多个容器”** ，但仍需要 **Docker（或其他运行时）** 来运行具体的容器。

**📌Docker 部署应用步骤**

**编写 Dockerfile** ，定义 运行环境。

**构建镜像** ： docker build -t my-python-app .

**运行容器** ： docker run -d -p 5000:5000 my-python-app

**\*\*📌\*\*K8s 服务部署步骤**

**编写 YAML 文件**

Deployment 定义 Pod 镜像、资源等

Service 使 Pod 在集群内可访问

使用 kubectl apply 进行创建:执行 kubectl apply -f deployment.yaml

kubectl 解析 YAML 并发送给 API Server

Scheduler 选择合适的 Node 部署 Pod

Controller Manager 控制 Pod 的创建和管理

Kubelet 通过 Container Runtime（如 Docker）拉取镜像并启动容器

**最终 Pod 运行，服务启动**

**Docker 是如何实现资源隔离的？（Namespace + Cgroups）**

Docker 通过 **Namespace（命名空间）** 和 **Cgroups（控制组）** 实现进程的隔离和资源限制。

**Namespace（命名空间）** ：提供进程级隔离，使不同容器间的进程、网络、文件系统等互不影响。主要包括：

PID （进程隔离） NET （网络隔离） IPC （进程间通信隔离） MNT （挂载点隔离） UTS （主机名隔离） USER （用户 ID 隔离）

**Cgroups（控制组）** ：控制 CPU、内存、I/O 资源，防止容器滥用资源

Cgroups 来管理 CPU 和内存资源

--cpu-shares （相对权重）：调整 CPU 竞争优先级，例如 1024 表示默认权重， 512 表示 CPU 资源占比减少一半。

--cpus=2 （指定 CPU 核心数）：限制容器最多可使用的 CPU 数量。

--cpuset-cpus="0,1" （绑定 CPU 核心）：指定容器只能在特定 CPU 核心上运行。

**内存资源管理** ：

--memory=512m （限制最大内存）：限制容器最多可使用 512MB 内存。

--memory-swap=1g （最大 swap 空间）：允许使用的交换空间。

--oom-kill-disable （防止 OOM 杀死进程）：防止容器因内存不足被系统终止。

**Kubernetes**

**K8S组件**

**1. 控制平面（Control Plane）** —— **负责控制和管理各个NODE**

\*\*API Server：提供 **REST API** ，是 K8s 的 \*\*入口，所有操作都通过它进行。

**Scheduler（调度器）** ：负责 **将 Pod 分配到合适的 Node** ，根据 CPU、内存等资源选择最优节点。

**Controller Manager（控制管理器）** ：负责 **自动化管理** （如：副本控制、自动扩缩容、故障恢复）。

**ETCD** ：分布式键值存储数据库，用于存储 Kubernetes 集群的所有配置信息和状态数据。

**2.工作节点（Node）** —— **运行应用程序**

**Kubelet** ： **管理当前 Node 上的 Pod 和容器** ，与 API Server 通信。

**Kube Proxy** ：实现 **Service 负载均衡** ，管理 Pod 之间的网络通信。

**Container Runtime（容器运行时）** ：运行容器，如 Docker、containerd 或 CRI-O。

**Pod（应用和辅助容器）** :K8s 中最小的调度单位， **一个 Pod 内可以运行一个或多个容器** 。

3\. **其他组件**

**Pod** ：K8s 最小的调度单位，包含一个或多个容器

**Deployment** ：用于管理 Pod 的部署，提供滚动更新、回滚等功能，

**Service** ：负责 Pod 之间的通信，Service 用于暴露 Pod，提供稳定的访问入口，常见类型有 ClusterIP、NodePort、LoadBalancer，如何使用 Service 实现负载均衡

**Ingress** ：提供 HTTP(S) 路由功能，允许外部访问集群内的服务，如何配置和使用 Ingress 进行访问管理。

**ConfigMap & Secret** （配置管理）：使用 ConfigMap 和 Secret 来存储非敏感和敏感配置信息

**Service:Pods 的访问管理**

Kubernetes 中的 Service 是为了简化 Pods 的访问管理而存在的抽象层。

Service 将多个 Pods 组合成一个统一的访问入口，并且不依赖于 Pod 的 IP 地址变化

**Service工作原理**

为 Pod 提供 **稳定的访问接口**

使用 **固定的 DNS 名称** 或 **ClusterIP** 来访问后端 Pod

**通过 kube-proxy 进行流量转发和负载均衡** ：Service 会自动对请求进行负载均衡，将流量发到后端Pods

**kube-proxy通过 iptables** **或 IPVS** **进行流量转发** 。

**iptables（默认）**

在每个 Node 上维护 iptables 规则，将请求转发到后端 Pod。

适用于小型集群，但在大规模集群中 iptables 规则可能太多，影响性能。

\*\*IPVS（推荐，\*\*适用于大规模集群）

依赖 Linux 内核 **IP Virtual Server (IPVS)** 进行高效流量转发。

支持 RR、WRR、LC、LCQ 等多种负载均衡算法。

**Service类型**

**ClusterIP** ：这是默认的Service类型，它为Service在集群内部提供一个内部的IP地址，这样集群中的其他组件就可以访问它。这个IP地址是集群内部的，外部网络无法访问它。

**NodePort** ：

在ClusterIP的基础上，为Service在每个节点的IP上提供一个静态端口（NodePort）。

可以通过 \<NodeIP\>:\<NodePort\> 的方式从集群外部访问

**LoadBalancer** ：

在NodePort的基础上，还会请求云提供商负载均衡器

负载均衡器会将外部的流量分发到集群中的Pods（互联网上可达的常用方式）

**Pod 内部** ：Service 通过 kube-proxy 进行负载均衡。

**Ingress**

Ingress 资源是 Kubernetes 中的一个 API 对象，它定义了 **外部请求如何路由到 Service**

相比 **NodePort** 和 **LoadBalancer** 类型的 Service，Ingress 提供了 **更强的路由控制能力** ，允许用户使用 **域名、路径、HTTPS 终止等功能** 来管理访问规则。

**Ingress Controller**

Ingress 本身只是一个规则定义，需要一个 **Ingress Controller** 来解析这些规则并执行相应的流量转发。

常见的 Ingress Controller：

**Nginx Ingress Controller（最常见）**

**Traefik**

**HAProxy**

**Istio Gateway（服务网格场景）**

**K8s 如何实现负载均衡/Pod如何访问**

**内部负载均衡(Service)**

**通过 Service 进行通信/负载均衡** , **Service** 提供一个 **稳定的访问入口** ，解决 Pod 动态 IP 变更的问题，负责将流量负载均衡到多个 Pod。

**Service 监听流量**

**kube-proxy 负责流量转发**

**iptables 方式（默认）** ： **基于 NAT（网络地址转换）机制** ，将请求随机转发到某个 Pod。

**IPVS 方式（适用于大规模集群）** ： **IPVS（基于 LVS 内核模块）** 来进行流量转发。

**外部负载均衡**

**1️⃣NodePort**

**暴露集群内部服务到每个 Node 的端口** （范围： 30000-32767 ）。

外部用户可以通过 NodeIP:NodePort 访问 Service。

**2️⃣LoadBalancer**

通过 **云提供商** 自动创建 **外部负载均衡器** ，直接提供 **公网 IP** 。

**3️⃣Ingress**

**Ingress** ，提供 **域名、路径转发、HTTPS 代理等功能** 。

Ingress Controller 解析HTTP请求，根据域名+路径匹配规则。

流量转发到后端 Service，Service 继续负载均衡到 Pod。

**K8S 中的 DNS 是如何工作的？（CoreDNS）**

**CoreDNS** 是 Kubernetes **默认的 DNS 解决方案** ，它的作用是：

**为集群内部 Service 提供 DNS 解析** （解析 \<service-name\>.\<namespace\>.svc.cluster.local ）。

**支持 DNS 负载均衡** （多个 Pod 关联同一个 Service）。

**可扩展（插件化架构）** ，支持自定义 DNS 解析规则。

**K8S的** [**三大插件**](https://link.zhihu.com/?target=https%3A//landscape.cncf.io/card-mode%3Fcategory%3Druntime%26grouping%3Dcategory%26zoom%3D150) **分别管控 运行时 、 网络 和 存储 ，**

**CRI** ：用于管理 **容器运行时** ，每个 Kubernetes 集群都需要部署容器运行时接口。

**CNI** ：用于管理 **容器网络连接** ，每个 Kubernetes 集群都必须要部署容器网络接口。

**CSI** ：用于提供持久化存储服务，只有在需要运行有状态服务时才需要部署。

**K8s 如何实现数据持久化？**

**PV（Persistent Volume）**

**PV 是由管理员预先配置的存储资源** ，独立于 Pod 生命周期，可被多个 Pod 申请使用。

**支持不同存储后端** （如 NFS、Ceph、AWS EBS、GCE PD）。

**PVC（Persistent Volume Claim）**

**PVC 是 Pod 申请持久化存储的方式** ，用户请求存储时，K8s 会自动匹配合适的 PV 进行绑定。

**动态存储分配** ：结合 StorageClass，可在需要时自动创建 PV

**PV 和 PVC 绑定过程**

管理员创建 PV。

用户创建 PVC，K8s 通过匹配规则（如大小、访问模式）找到合适的 PV 进行绑定。

Pod 通过 PVC 访问存储，数据不会因 Pod 重新创建而丢失。

**K8s 中如何进行自动扩展**

**Horizontal Pod Autoscaler (HPA)（水平扩展）**

**HPA 通过 CPU 或自定义指标动态调整 Pod 副本数** ，保证服务性能和资源利用率。

**工作机制：**

监控 Pod 的 CPU / 内存使用情况（或自定义指标）。

当指标超出预设阈值时，HPA 自动增加 Pod 副本数；低于阈值时减少副本数。

**LimitRange（单个 Pod/Container 资源限制）**

**限制 Namespace 内单个 Pod/Container 的最小/最大 CPU 和内存使用量。**

**防止某些 Pod 消耗过多资源影响其他 Pod。**

**K8s 中如何管理集群的资源限制和配额？**

**ResourceQuota（资源配额）**

**限制命名空间内的总资源使用量** ，防止某个团队/用户占用过多资源。

**可限制 CPU、内存、存储、Pod 数量等。**

**示例：限制某个 Namespace 内最多创建 10 个 Pod，总 CPU 不超过 4 核**

**LimitRange（单个 Pod/Container 资源限制）**

**限制 Namespace 内单个 Pod/Container 的最小/最大 CPU 和内存使用量。**

**防止某些 Pod 消耗过多资源影响其他 Pod。**

**📌 K8s 如何调度 Pod？**

Kubernetes 调度是通过 **调度器和 Kubernetes API** 交互实现的。

调度器并不会直接操作节点，而是通过 API 调用来获取集群的资源信息并将 Pod 分配到合适的节点。

**资源请求和限制**

每个 Pod 可以定义请求（ requests ）和限制（ limits ）资源。在调度时，调度器会确保候选节点具有足够的资源来满足 Pod 的请求。调度器会基于节点的资源负载情况来做出决策。

**调度约束（硬性规则）** ：

**NodeSelector** :只能调度到具有特定标签的节点，

**Taints & Tolerations（污点和容忍度）** ：用于限制 Pod 只能调度到特定节点，

**亲和性和反亲和性** Kubernetes 允许用户为 Pod 设置节点亲和性和反Pod 亲和性，控制 Pod 在节点和集群中的分布。这些规则包括：

**节点亲和性** ：控制 Pod 与特定节点的亲和性。

**Pod 亲和性和反亲和性** ：控制 Pod 与其他 Pod 的亲和性或反亲和性，避免将不兼容的 Pod 调度到同一个节点上。

**自定义调度策略** ：如优先级和抢占机制（PriorityClass）。

**📌 Pod 被驱逐**

Pod 可能因 **资源超限、节点压力、策略性驱逐** 而被驱逐：

**1. 资源超限驱逐（Out of Resource Eviction）** ：磁盘空间不足、内存不够

K8s 会 **优先驱逐 BestEffort 级别的 Pod** ，其次是 Burstable，最后是 Guaranteed。

**2. Pod 生命周期管理**

**ReplicaSet、Deployment 变更** ：Pod 可能因 **滚动更新** 而被删除并重新调度。

**节点故障** ：如果节点不可用（ NotReady 超过 5 分钟），K8s 会重新调度 Pod

策略性驱逐

管理员手动驱逐, 用于节点维护时，强制迁移 Pod。kubectl drain --ignore-daemonsets

**🌟 Docker 相关面试问题**

**1. Docker 基础概念**

什么是 Docker？它的核心组件有哪些？

Docker 和虚拟机的区别？（轻量级、共享内核、启动快）

Docker 的 3 大核心概念是什么？（镜像 Image、容器 Container、Dockerfile）

Docker 镜像的分层结构是怎样的？

**2. Docker 进阶问题**

Docker 的 COPY 和 ADD 指令有什么区别？

Docker 容器的数据如何持久化？（Volume vs Bind Mount）

如何优化 Docker 镜像？（减少层数、使用 **Alpine** 版本、合并 RUN 语句）

Docker 的网络模式有哪些？（Bridge, Host, None, Overlay）

**3. Docker 运行机制**

Docker 是如何实现资源隔离的？（Namespace + Cgroups）

什么是 Docker 的零拷贝？（Direct I/O、sendfile、mmap）

Docker 是如何管理 CPU 和内存资源的？（Cgroups 限制）

Docker 容器是如何进行进程间通信的？（共享 Volume、网络通信）

docker stop 和 docker kill 的区别？

**4. 容器编排与管理（Compose & Swarm）**

Docker Compose 是什么？如何管理多个容器？

Docker Swarm 和 Kubernetes 有什么区别？

**Docker 面试问题：**

**Docker 的基本概念是什么？**

Docker 是什么，为什么需要 Docker，它如何解决应用程序的部署问题。解释容器和虚拟机的区别。

**Docker 容器和虚拟机有什么区别？**

容器是如何轻量级且高效地运行应用程序的，容器如何共享操作系统内核，而虚拟机需要模拟整个操作系统。

**Docker 容器如何进行资源隔离？**

通过 Linux 的 Namespace 和 Cgroups 实现容器的资源隔离。

**什么是 Docker 镜像？如何创建 Docker 镜像？**

镜像的定义，镜像与容器的区别，如何使用 Dockerfile 创建镜像，Dockerfile 的常用指令。

**Dockerfile 中的 COPY** **和 ADD** **有什么区别？**

在 Dockerfile 中， COPY 和 ADD 都是用于将文件或目录从主机复制到镜像中的指令，

**COPY** ：简单地将文件或目录从构建上下文复制到镜像中，功能明确，适用于大多数文件复制场景。

**ADD** ：除了具备 COPY 的功能外，还能自动解压 .tar 文件，并支持从远程 URL 下载文件。

**Docker 容器如何与宿主机进行通信？**

**网络通信：**

**桥接网络（Bridge）** （默认）：容器可以通过 docker0 网桥和宿主机通信，使用 -p 选项将容器端口映射到宿主机端口，如 docker run -p 8080:80 nginx 。

**主机网络（Host）** ：容器直接使用宿主机的网络，访问宿主机服务无需端口映射， docker run --network host nginx 。

**Macvlan 网络** ：允许容器拥有独立 IP，与宿主机在同一局域网中，适用于更复杂的网络需求。

**存储共享：**

使用 **Volume** 共享数据： docker volume create mydata 并挂载到容器 docker run -v mydata:/data nginx 。

直接挂载宿主机目录： docker run -v /host/path:/container/path nginx ，容器可以访问宿主机文件。

**什么是 Docker Compose？如何使用 Docker Compose 管理多个容器？**

Docker Compose 是如何让你用 YAML 文件管理和配置多容器应用，如何使用 docker-compose.yml 配置文件定义服务。

**Docker 容器如何持久化数据？**

使用 Docker 数据卷（Volumes）进行数据持久化，区别与容器内部存储。

**如何管理 Docker 容器的生命周期？**

如何启动、停止、删除 Docker 容器，容器的状态管理。

**Docker 容器如何进行网络配置？**

Docker 网络模式（bridge、host、none、自定义网络），如何在容器间进行通信。

**Kubernetes 面试问题：**

**Pod 内部多个容器如何通信？** （localhost）

Pod 内的所有容器共享 **同一个网络命名空间** ，可以通过 localhost 直接访问彼此的端口。

Pod 资源限制是如何实现的？（requests & limits）

使用 **requests（最小资源）** 和 **limits（最大资源）** 控制 CPU 和内存：

**K8s的 Persistent Volume（PV）和 Persistent Volume Claim（PVC）是什么？**

PV 和 PVC 是如何实现持久化存储的，如何将存储资源与 Pod 进行关联。

\*\*K8s中如何进行自动扩展？\*\*k8s

Horizontal Pod Autoscaler (HPA)，如何根据负载自动增加或减少 Pod 副本数。

**k8s中如何管理集群的资源限制和配额？**

如何使用 ResourceQuota、LimitRange 等控制资源的使用，防止资源过度消耗。

**k8s的节点（Node）是什么？如何管理节点的状态？**

Node 是运行 Pod 的机器，如何管理节点的生命周期，如何处理节点的故障和资源调度。

**k8s中如何进行日志收集和监控？**

如何使用集成的监控工具（如 Prometheus、Grafana）和日志收集工具（如 Fluentd、ELK）来监控 Kubernetes 集群。

**k8s中的 Helm 是什么？**

Helm 是 Kubernetes 的包管理工具，如何使用 Helm 来简化 Kubernetes 应用的部署和管理。

**K8s 和 Docker 之间的区别和联系：**

**Docker 和 Kubernetes 有什么区别？**

**Docker** ：专注于容器化和容器管理。

**Kubernetes** ：容器编排平台，用于管理多个 Docker 容器的部署、扩展、服务发现和负载均衡。

**如何将 Docker 与 Kubernetes 结合使用？**

**回答要点** ：Docker 用于构建和运行容器，Kubernetes 用于自动化管理和协调这些容器。Docker 作为容器运行时，Kubernetes 管理 Docker 容器的部署、扩展和服务发现。

**Docker 容器和 Kubernetes Pod 的关系是什么？**

**回答要点** ：Kubernetes Pod 是一个或多个容器的集合，通常使用 Docker 容器运行。Pod 是 Kubernetes 的最小部署单元，而 Docker 容器是实际运行应用的容器。

**Kubernetes 是否可以使用 Docker 以外的容器运行时？**

**回答要点** ：是的，Kubernetes 支持多种容器运行时，如 Docker、containerd、CRI-O 等。

**1. 如何优化 Docker 镜像构建速度？**

**利用构建缓存** ：重用不变层的缓存，避免重复构建。

**使用轻量级基础镜像** ：如 Alpine，减少镜像大小。

**减少镜像层数** ：合并多个命令为一个，减少层的数量。

**删除不必要的文件** ：删除临时文件和无用文件减小镜像大小。

**2. 如何排查 Kubernetes 中 Pod 启动失败的问题？**

使用 kubectl describe pod \<pod-name\> 查看事件和错误信息。

使用 kubectl logs \<pod-name\> 查看容器日志。

检查资源请求、限制和节点的可用资源。

**3. 容器 OOM 了，如何排查问题？**

查看 Pod 的状态是否为 OOMKilled ，使用 kubectl describe pod \<pod-name\> 。

查看容器日志使用 kubectl logs \<pod-name\> 。

检查内存请求和限制，确保合理配置。

**4. Kubernetes 如何进行 Service 发现？**

**DNS** ：Kubernetes 自动为每个 Service 创建 DNS 记录，Pod 可以通过 my-service.default.svc.cluster.local 访问。

**环境变量** ：Pod 启动时会通过环境变量自动发现其他服务。

**准备面试时的建议：**

理解 **Docker** 和 **Kubernetes** 的基本概念和工作原理。

深入了解容器化应用的部署、管理、监控、扩展等方面。

掌握 **Kubernetes** 中的核心概念如 Pod、Service、Deployment、Ingress、ConfigMap、Secret、PV、PVC 等。

对 **Docker** 和 **Kubernetes** 之间的关系、如何结合使用它们来解决应用的容器化和自动化部署有清晰的理解。

通过理解这些问题，并准备相关答案，你能够更好地应对面试并展示你的 Docker 和 Kubernetes 知识。
