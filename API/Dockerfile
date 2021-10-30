FROM mcr.microsoft.com/dotnet/sdk:5.0
COPY bin/Release/netcoreapp2.2/publish/ App/
WORKDIR /App
ENTRYPOINT ["dotnet", "NetCore.Docker.dll"]
